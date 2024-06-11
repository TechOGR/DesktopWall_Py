from os.path import (
    join
)
from threading import Thread
from flask import (
    render_template,
    request,
    json
)
from modules.subModules.recycleBin import RecycleBin
from modules.subModules.musicPlayer import Player

def Router(app):
    
    rb = RecycleBin()
    player = Player()
    
    @app.route("/")
    def main():
        return render_template("index.html")
    
    @app.route("/binInfo")
    def getInfo():
        
        numFiles, size, status = rb.getNumFiles()
        
        objeto = {
            'numFiles': numFiles,
            'size': size,
            'status': status
        }
        
        return app.json.dumps(objeto)
    
    @app.route("/empty")
    def emptyTrash():
        
        returned = rb.emptyTrash()
        
        objeto = {
            'message': returned
        }
        
        return app.json.dumps(objeto)
    
    @app.route("/getInfoFiles")
    def infoFiles():
        
        names, paths = rb.getPropertiesFile()
        with open("esto.txt", "w") as f:
            f.write(str({"names": names, "paths": paths}))
            f.close()
        objeto = {
            'names': names,
            'paths': paths
        }
        
        return app.json.dumps(objeto)
    
    @app.route("/restore", methods=["POST"])
    def restore():
        req = request.json
        
        nameFile = req["nameFile"]
        pathFile = req["pathFile"]
        
        rb.restoreFile(nameFile, pathFile)
        
        return "OK"
    
    @app.route("/getTrackInfo")
    def getInfoTrack():
        checkAIMP = player.checkIfOn()
        data = player.getInfoPlayer()
        
        if checkAIMP:
            return app.json.dumps(data)
        else:
            data = {
                'name': 'No iniciado',
                'duration': '0:0'
            }
            return app.json.dumps(data)
        
    @app.route("/player", methods=["POST"])
    def controlPlayer():
        req = request.json["cambio"]
        
        if req == "PlayPause":
            player.PlayPause()
        elif req == "Next":
            player.Next()
        elif req == "Prev":
            player.Previous()
            
        return "OK"