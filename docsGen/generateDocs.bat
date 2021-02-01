:: Running this bat file generates the docs folder using jsdoc with the better-docs template.
:: If you are wanting to generate your own docs, the commands here assume you are using better-docs at the given path and that jsdoc is installed globally. If these aren't true, you'll need to edit this batch file and conf.json appropriately.
@echo ON

:: Remove the old docs directory.
rmdir /s /q ..\docs

:: For some reason better-docs doesn't copy style.css to the output, so we have to do it here.
xcopy style.css ..\docs\

:: For some reason, jsdoc exits the batch file, so don't put anything after it.
jsdoc -c conf.json -t "C:/Program Files/nodejs/node_modules/npm/node_modules/better-docs"