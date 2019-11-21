echo off
cls
node index.js | tee latest.log
echo.
echo Bot Was Shut Down Remotely, or has crashed.
PAUSE
