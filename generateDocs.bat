:: The template used is defined in jsdoc.json
@echo ON
rmdir /s /q docs
:: For some reason better-docs doesn't copy docsStyle.css to the output, so I'll do it myself.
xcopy docsStyle.css docs\
jsdoc -c jsdoc.json