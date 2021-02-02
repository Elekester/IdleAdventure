:: Running this bat file generates the docs folder using jsdoc with the configuration from conf.json.
@ECHO OFF

:: Remove the old docs directory.
RD /s /q ..\docs

:: At least on my computer jsdoc exits the batch file, so don't put anything after it.
JSDOC -c conf.json