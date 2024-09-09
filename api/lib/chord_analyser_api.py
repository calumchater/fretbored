from os import environ
from requests import Session

class ChordAnalyserAPI():

    # Add authentication key here
    # auth(user, pass)

    API_URL = environ.get('CHORD_ANALYSER_URL')

    def __init__(self):
        self.session = Session()

    def request(self, method: str, path: str, *args, **kwargs) -> dict:
        return self.session.request(
            method, self.APIURL + path, *args, **kwargs
        ).json()
    

    def generate_chords(self, song_url: str) -> dict:
        breakpoint()
        return self.request('GET', '/chords', params={'song_url': song_url})