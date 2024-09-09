import itertools
import pdb

import api.services.constants as constants
import api.services.helpers as helpers

# Steps to generate all the triads and their inversions for each set of strings
# Get all the triad notes (major or minor) and tag which is root, third and fifth
# The inversions always have the same note orders, 1-3-5, 3-5-1 and 5-1-3


# Goal object
# triad = {
#     "name": "C Root Position",
#     "notes": ['C', 'E', 'G']
#     "note_locations": ["3,5", "2,5", "1,3"],  # how de we
#     "strings": [1, 2, 3],
# }


# Once the user asks for a set of strings, we just have to select a certain number of triads from our list
#
# Do I want to be able to change the tunings ? not just yet. I'd rather be able to do all the chords + scales if possible
#
# SELECT LIMIT(30) FROM triads WHERE string_set = 1,2,3

# Different tunings => either generate the data again with a different set of starting notes, or just


def generate_base_triads(notes, gaps, chord_type):
    chords = []
    for note in notes:
        chord = {"notes": [], "chord_type": chord_type}
        for gap in gaps:
            chord["notes"].append(notes[(notes.index(note) + gap) % 12])
        chord["name"] = chord["notes"][0] + " " + chord_type + " Root Position"
        chords.append(chord)

    return chords


def generate_first_inversion(base_triad):
    name = base_triad["notes"][0] + " " + base_triad["chord_type"] + " First Inversion"
    return {
        "name": name,
        "chord_type": base_triad["chord_type"],
        "notes": [
            base_triad["notes"][1],
            base_triad["notes"][2],
            base_triad["notes"][0],
        ],
    }


def generate_second_inversion(base_triad):
    name = base_triad["notes"][0] + " " + base_triad["chord_type"] + " Second Inversion"
    return {
        "name": name,
        "chord_type": base_triad["chord_type"],
        "notes": [
            base_triad["notes"][2],
            base_triad["notes"][0],
            base_triad["notes"][1],
        ],
    }


def generate_all_inversions(base_triads):
    all_inversions = []
    for triad in base_triads:
        all_inversions.append(generate_first_inversion(triad))
        all_inversions.append(generate_second_inversion(triad))

    return all_inversions


# Now I have to go through all these triads, and find them on each string set
# We have string_notes which contains all the notes in order for each string, ready to be used
# We don't want to modify our reference array of triads, so we copy it to a new variable and add the string_set + locations

### Figure out how to handle the cases where it's fret 12 or further

def find_all_locations_for_a_string_set(string_set, triads):
    full_triad_array = []
    for triad in triads:
        full_triad = triad
        # find their locations for the string set we gave
        full_triad["strings"] = string_set
        # string_set[2] will be the highest string, our first note in the triad notes (it's inverted because guitars are chaotic)
        full_triad["note_locations"] = [
            str(string_set[0])
            + ","
            + str(string_notes[string_set[0]].index(triad["notes"][2])),
            str(string_set[1])
            + ","
            + str(string_notes[string_set[1]].index(triad["notes"][1])),
            str(string_set[2])
            + ","
            + str(string_notes[string_set[2]].index(triad["notes"][0])),
        ]
        full_triad_array.append(full_triad)

    return full_triad_array


def do_all_string_sets(triads, string_sets_iter):
    all_strings_triads = []
    for string_set in string_sets_iter:
        print(string_set)
        locations = find_all_locations_for_a_string_set(string_set, triads)
        print(locations)
        all_strings_triads.append(locations)

    return all_strings_triads


print("________________________________________________________________")
print("Getting the locations for each string set...")

major_triads = []
minor_triads = []


# Get string values
string_notes = helpers.get_string_notes(constants.STANDARD_TUNING_NOTES, constants.ALL_NOTES)


base_triads = generate_base_triads(
    constants.STANDARD_TUNING_NOTES, constants.MAJOR_TRIAD_GAP, "Major"
) + generate_base_triads(constants.STANDARD_TUNING_NOTES, constants.MINOR_TRIAD_GAP, "Minor")


# Now for each string set, go through each of those triads and find the positions
all_triads_reference = base_triads + generate_all_inversions(base_triads)

completed_triads = do_all_string_sets(all_triads_reference, constants.TRIAD_STRING_SETS)
