:: Running this bat file generates the ../docs folder using JSDoc with the configuration from conf.json.
@ECHO OFF
RD /s /q ..\docs
JSDOC -c conf.json
