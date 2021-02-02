:: Running this bat file generates the docs folder using jsdoc with the better-docs template.
:: If you are wanting to generate your own docs, the commands here assume you are using better-docs and that it is installed in the same location as jsdoc.
@ECHO OFF

:: Remove the old docs directory.
RD /s /q ..\docs

:: At least on my computer jsdoc exits the batch file, so don't put anything after it.
JSDOC -c conf.json -t ..\better-docs