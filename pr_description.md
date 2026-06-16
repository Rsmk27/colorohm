🧪 [Testing Improvement] Add ResistorCalculator test suite

🎯 **What:** The `ResistorCalculator` utility lacked tests, leading to potential regressions during refactoring.
📊 **Coverage:** A test file was created to add unit tests for `formatResistance`, `calculateFromColors`, `decodeSMD`, and `encodeSMD` covering many different resistor scenarios like 4-band, 5-band, 6-band components as well as standard value parsing and formatting.
✨ **Result:** Test coverage improved. The test suite provides reliable validation ensuring changes do not break critical resistor parsing and display logic.
