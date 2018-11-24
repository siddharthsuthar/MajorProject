from flask import Flask, request, jsonify,session
from flask_cors import CORS
import os
import tensorflow as tf
import urllib.request
import threading
import json
import numpy as np
import wikipedia

from prepro import convert_to_features, word_tokenize
from time import sleep
from werkzeug.utils import secure_filename
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')
app = Flask(__name__)
CORS(app)
query = []
response = ""
UPLOAD_FOLDER = 'uploads'

@app.route('/answer', methods=['POST'])
def answer():
    print(request.get_json())
    passage = request.get_json()['passage']
    question = request.get_json()['question']
    print("received question: {}".format(question))
    # if not passage or not question:
    #     exit()
    global query, response
    query = (passage, question)
    while not response:
        sleep(0.1)
    print("received response: {}".format(response))

   # response_ = {"answer": response}
    #response = []
    return jsonify({"answer": response}), 201


@app.route('/upload', methods=['POST'])
def fileUploader():
    # target=os.path.join(UPLOAD_FOLDER,'test_docs')
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    # logger.info("welcome to upload`")
    # #file = request.files['file']
    data = request.files['file'].read()
    # print(data)
    # filename = secure_filename(file.filename)
    # destination="/".join([target, filename])
    # file.save(destination)
    #
    # text=file.read()
    #session['uploadFilePath']=destination

    return jsonify({"text": format(data)}),201

@app.route('/keyword', methods=['POST'])
def searchWiki():
    print(request.get_json())
    keyword = request.get_json()['keyword']
    content =  wikipedia.summary(keyword, sentences=7)
    #print(content)
    return jsonify({"keyword_data": content}),201



class Demo(object):
    def __init__(self, model, config):

        run_event = threading.Event()
        run_event.set()
        threading.Thread(target=self.demo_backend, args = [model, config, run_event]).start()
        app.run()
        try:
            while 1:
                sleep(.1)
        except KeyboardInterrupt:
            print("Closing server...")
            run_event.clear()

    def demo_backend(self, model, config, run_event):
        global query, response

        with open(config.word_dictionary, "r") as fh:
            word_dictionary = json.load(fh)
        with open(config.char_dictionary, "r") as fh:
            char_dictionary = json.load(fh)

        sess_config = tf.ConfigProto(allow_soft_placement=True)
        sess_config.gpu_options.allow_growth = True

        with model.graph.as_default():

            with tf.Session(config=sess_config) as sess:
                sess.run(tf.global_variables_initializer())
                saver = tf.train.Saver()
                saver.restore(sess, tf.train.latest_checkpoint(config.save_dir))
                if config.decay < 1.0:
                    sess.run(model.assign_vars)
                while run_event.is_set():
                    sleep(0.1)
                    if query:
                        context = word_tokenize(query[0].replace("''", '" ').replace("``", '" '))
                        c,ch,q,qh = convert_to_features(config, query, word_dictionary, char_dictionary)
                        fd = {'context:0': [c],
                              'question:0': [q],
                              'context_char:0': [ch],
                              'question_char:0': [qh]}
                        yp1,yp2 = sess.run([model.yp1, model.yp2], feed_dict = fd)
                        yp2[0] += 1
                        response = " ".join(context[yp1[0]:yp2[0]])
                        query = []


