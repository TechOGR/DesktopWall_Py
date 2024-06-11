import pyaimp

class Player:
    
    def __init__(self):
        try:
            self.aimp = pyaimp.Client()
        except:
            print("No iniciado")
    
    def checkIfOn(self):
        try:
            self.aimp = pyaimp.Client()
            return True
        except:
            print("Error")
            return False
            
    def getInfoPlayer(self):
        objeto = {
            'name': "",
            'duration': ""
        }
        try:
            infoTrack = self.aimp.get_current_track_info()
            
            nameTrack = infoTrack["title"]
            durationTrack = infoTrack

            objeto = {
                'name': nameTrack,
                'duration': durationTrack
            }
            
            return objeto
        
        except AttributeError:
            
            objeto = {
                "name": "No iniciado",
                "duration": "0:0:0"
            }
            
            return objeto
    
    def PlayPause(self):
        self.aimp.play_pause()
        
    def Next(self):
        self.aimp.next()
        
    def Previous(self):
        self.aimp.prev()
            
# if __name__ == "__main__":
#     play = Player()
#     print(play.checkIfOn())
#     esto = 238650
#     print()
#     play.getInfoPlayer()