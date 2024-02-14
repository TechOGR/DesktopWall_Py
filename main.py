from flask import (
    Flask
)
from os.path import (
    join,
    abspath
)
from os import (
    getcwd,
    environ
)
from modules.router import Router
import sys


class Main:
    
    def __init__(self) -> None:

        self.init_Components()
        
    def init_Components(self):
        
        self.HOST = environ.get("devHOST", "127.0.0.1")
        self.PORT = environ.get("devPORT", 3500)
        
        self.fullPath = getcwd()
        self.staticPath = join(self.fullPath, "static")
        self.templatePath = join(self.fullPath, "template")
        
        self.app = Flask (
            __name__,
            static_folder = self.staticPath,
            template_folder = self.templatePath
        )
        
        Router (
            app = self.app
        )
        
    def runServer(self):
        self.app.run(
            host=self.HOST,
            port=self.PORT,
            debug=True,
            load_dotenv=True
        )
        
if __name__ == "__main__":
    
    app = Main()
    sys.stdout = open("./log.txt", "w")
    app.runServer()