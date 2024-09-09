from api.crud.scales_database_service import ScalesDatabaseService

from . import constants
from . import helpers


# Gaps look like this [0, 2, 4, 5, 7, 9, 11]
# A scale should look the same but replace by note names
# C = [C,D,E,F,G,A,B}]
# ...

# This class generates them all for each note for a given gap


class GenerateScalesService:

    def __init__(self, gaps, scale_type):
        self.gaps = gaps
        self.scale_type = scale_type

    def call(self):

        # Wrap in a transaction so that it either insert them all or fails
        for scale in self.get_all_scales:
            ScalesDatabaseService().insert(scale.notes, scale.name, scale.notes[0])

    def get_all_scales(self):
        all_scales = []
        for note in constants.ALL_NOTES:
            all_scales.append(self.build_scale_object(note))

    def get_scale_notes(self, starting_note):
        scale_notes = []
        for gap in self.gaps:
            scale_notes.append(
                constants.ALL_NOTES[
                    (constants.ALL_NOTES.index(starting_note) + gap) % 12
                ]
            )

        return scale_notes

    def build_scale_object(self, note):
        notes = self.get_scale_notes(note)
        return {
            "name": f"{notes[0]} {self.scale_type}",
            "notes": notes,
            "starting_note": notes[0],
            "scale_type": self.scale_type,
        }
