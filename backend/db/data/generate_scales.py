##
#   How does a scale get formed ? By going through the scale and selecting notes at certain intervals
#   How do I want to form them ? I want to gve it a gap, and let it generate the notes
#   What makes a scale playable in one position ? If the total length on one string is <= 5
#   What are the starting positions ? Whatever the first note of the scale is first
#
#   Step 1: When calculating a scale, get the list of notes that form it (thanks to the gaps)
#   Step 2: From Top String, go through all the notes of the scale as as starting positions
#   Step 3: Build the scale on all strings by going through the gaps and selecting notes
#   Step 4: Add notes until the max gap on string is 5, then go to the next string


import constants
import helpers

# List of all notes of the fretboard from fret 0 to 11 => make this extensible in the future
string_notes = helpers.get_string_notes(
    constants.STANDARD_TUNING_NOTES, constants.ALL_NOTES
)
# print(string_notes)


def get_scale_notes(notes, starting_note, gaps):
    scale_notes = []
    for gap in gaps:
        scale_notes.append(notes[(notes.index(starting_note) + gap) % 12])

    return scale_notes


scale_notes = get_scale_notes(constants.ALL_NOTES, "C", constants.MAJOR_SCALE_GAP)

# print(scale_notes)

# def get_all_scale_notes(gap):


def find_note_position(string, note):
    return string_notes[string].index(note)


# Scale example:
# {
#     name: C Major Scale Position 1
#     notes: []
#     note_locations: [],
#     scale_type: 'Major'
# },
# {
#     name: C Major Scale Position 2
#     notes: []
#     note_locations: [],
#     scale_type: 'Major'
# },...


# Big boi metho
def build_scale(notes, gaps, scale_name):
    # Go through each note
    scales = []
    for starting_note in constants.ALL_NOTES:
        scale_notes = get_scale_notes(notes, starting_note, gaps)
        # Loop through each note => make the different scale positions
        for scale_note in scale_notes:
            scale = {
                "name": f"{starting_note} {scale_name} Position {scale_notes.index(scale_note)}"
            }
            scale_locations = []
            current_string = 6
            current_note = scale_note
            current_position = find_note_position(current_string, scale_note)
            while current_string >= 1:
                scale_locations.append(
                    {
                        "note": current_note,
                        "location": str(current_string) + "," + str(current_position),
                    }
                )
                # Keep track of how wide the scale is on current string
                total_string_gap = 0
                index = 0
                next_gap_length = (
                    gaps[(index + 1) % len(scale_notes)]
                    - gaps[index % len(scale_notes)]
                )
                while total_string_gap + next_gap_length <= 5:
                    print(current_note)
                    scale_locations.append(
                        {
                            "note": current_note,
                            "location": str(current_string)
                            + ","
                            + str(current_position + next_gap_length),
                        }
                    )

                    current_note = scale_notes[
                    (scale_notes.index(current_note) + 1) % len(scale_notes)
                    ]
                    current_position = find_note_position(current_string, current_note)

                    total_string_gap += next_gap_length
                    
                    next_gap_length = gaps[(index + 1) % len(scale_notes)] - gaps[index % len(scale_notes)]

                current_string -= 1

                # Make the current position on the next string instead of the one we're already  on
                current_position = find_note_position(current_string, current_note)

    return scales


build_scale(constants.ALL_NOTES, constants.MAJOR_SCALE_GAP, 'Major')