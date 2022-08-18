"use strict";
//middelware function that will take a .perf and return a .svg
/*
we will need to use commist and minimist to define the automated command line functions
we will need to import two .pl scripts from Gregg's repo

1. run the following command to collapse the stack frames
./stackcollapse-perf.pl out.perf > out.folded

2. run the following command to convert collapsed stack frames into .svg
./flamegraph.pl out.kern_folded > kernel.svg

3. return the .svg to the next middleware function
*/
// const execSync = require('child_process').execSync
exports.__esModule = true;
// exec() method: This method creates a shell first and then executes the command. 
var exec = require('child_process').exec;
var express = require('express');
var app = express();
var flamegraphController = {
    stackCollapse: function (req, res, next) {
        //node child process
        // const fileName = parseInt(res.locals.id); 
        var fileName = '1';
        exec("./src/perlScripts/stackCollapse-perf.pl ./database/captures/1.perf > ./database/captures/folded/1.folded", function (error, stdout, stderr) {
            //change to String | Buffer if it doesnt work
            //  console.log(`stdout: ${stdout}`)
            if (error) {
                //   return next({
                //     log: 'something went wrong with the stackFolder middleware',
                //     message: { err: error },
                //   });
                console.log('err in stackCollapse');
                return res.status(500).json('stackFolder err-----');
            }
            return next();
        });
    },
    toSVG: function (req, res, next) {
        // const fileName = res.locals.id;
        var fileName = '1';
        exec("./src/perlScripts/flamegraph.pl ./database/captures/folded/1.folded > ./database/captures/SVGs/1.svg", function (error, stdout, stderr) {
            //store file ./database/SVGs
            if (!error)
                return next();
            else
                return res.status(500).json('toSVG err-----');
            // return next({
            //   log: 'i am lost-------',
            //   message: 'Error in toSVG controller'
            // });
        });
    }
};
// temperaty testing of functiosn
app.get('/', function (req, res) { return res.json('test the server..'); });
app.get('/test', flamegraphController.stackCollapse, flamegraphController.toSVG, function (req, res) {
    return res.status(200).json('test fg controllers sucessfull-----');
});
app.listen('3000', function (err) { if (err)
    console.log(err);
else
    console.log('server is listening....at 3000'); });
module.exports = flamegraphController;
