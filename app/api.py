# -*- coding: UTF-8 -*-
"""
    Restfull API simples example.
    For more look here: 
        http://flask-restful-cn.readthedocs.io/en/0.3.4/quickstart.html

"""

from flask_restful import Resource, Api

from app import app

class HelloWorld(Resource):
    """
        Example of class with REST methods
    """
    def get(self):
        """
            GET method of REST API
        """
        return {'hello': 'world'}, 200, {'Etag': 'some-opaque-string'}

    def put(self):
        """
            PUT method of REST API
        """
        return '', 201

    def delete(self):
        """
            DELETE method of REST API
        """
        return '', 404

api = Api(app)
api.add_resource(HelloWorld, '/hello')
