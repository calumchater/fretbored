


import json
import api.services.constants as constants
import api.services.helpers as helpers

class GenerateScalePositions():

# List of all notes of the fretboard from fret 0 to 11 => make this extensible in the future


    def __init__(self, scale_notes):
        self.scale_notes = scale_notes
        self.base_positions = self.base_scale_positions()


    def build_scale(self, notes, gaps, scale_name):
        # Go through each note
        scales = []
        for starting_note in constants.ALL_NOTES:
            scale_notes = self.get_scale_notes(notes, starting_note, gaps)
            # Loop through each note => make the different scale positions
            for scale_note in scale_notes:
                scale = ''
                scale_locations = []
                current_string = 6
                current_note = scale_note
                current_position = self.find_note_position(current_string, scale_note)
                while current_string >= 1:
                    scale_data = {
                        "note": current_note,
                        "location": str(current_string) + "," + str(current_position),
                    }
                    scale_locations.append(scale_data)
                    print(scale_data)
                    # Keep track of how wide the scale is on current string
                    total_string_gap = 0
                    index = 0
                    next_gap_length = (
                        gaps[(index + 1) % constants.SCALE_LENGTH]
                        - gaps[index % constants.SCALE_LENGTH]
                    )
                    while total_string_gap + next_gap_length <= 5:
                        current_note = scale_notes[
                            (scale_notes.index(current_note) + 1) % constants.SCALE_LENGTH
                        ]
                        current_position = find_note_position(current_string, current_note)

                        ###
                        print(
                            {
                                "note": current_note,
                                "location": str(current_string)
                                + ","
                                + str(current_position),
                            }
                        )
                        ###
                        scale_locations.append(
                            {
                                "note": current_note,
                                "location": str(current_string)
                                + ","
                                + str(current_position),
                            }
                        )

                        total_string_gap += next_gap_length

                        next_gap_length = (
                            gaps[(index + 1) % len(scale_notes)]
                            - gaps[index % len(scale_notes)]
                        )

                    current_string -= 1

                    # Make the current position on the next string instead of the one we're already  on
                    current_position = find_note_position(current_string, current_note)

        return scales


    def base_scale_positions(self):
        with open('base_scale_positions.json') as f:
            json.load(f)
