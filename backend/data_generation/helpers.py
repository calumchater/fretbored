
def get_string_notes(starting_notes, notes):
    string_notes = {}
    string_number = 6
    for starting_note in starting_notes:
        string_notes[string_number] = (
            notes[notes.index(starting_note) :] + notes[0 : notes.index(starting_note)]
        )
        string_number -= 1

    return string_notes

