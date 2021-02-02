:: Running this bat file generates the docs folder using jsdoc with the better-docs template.
:: If you are wanting to generate your own docs, the commands here assume you are using better-docs and that it is installed in the same location as jsdoc.

:: Remove the old docs directory.
rmdir /s /q ..\docs

:: For some reason better-docs doesn't copy style.css to the output, so we have to do it here.
xcopy style.css ..\docs\

:: For some reason, on my computer jsdoc exits the batch file, so don't put anything after it.
jsdoc -c conf.json -t ..\better-docs