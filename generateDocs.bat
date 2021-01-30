:: The template used is defined in jsdoc.json
@echo ON
rmdir /s /q docs
:: For some reason better-docs doesn't copy docsStyle.css to the output, so I'll do it myself.
xcopy docsStyle.css docs\
:: For some reason, jsdoc exits the batch file, so don't put anything after it.
jsdoc -c jsdoc.json