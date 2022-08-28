import { Request, Response, NextFunction } from 'express';
import captureDB, { Capture } from '../models/captureModel';
import { DbCInterface, CbThis } from '../interfaces/dbcontroller.interface';
import { InfernodeError } from '../utils/globalErrorHandler';


/*
Dtrace command to convert .txt to .svg
$ ./stackcollapse.pl filename.txt | ./flamegraph.pl > filename.svg

the application to profile will arrive on the req body of the first middlware function
the perl scripts from Gregg will convert .txt to .svg
we need to use a Dtrace tool to profile the application and output a .txt stack trace
from there the .pl files will do all the heavy lifting

The following example uses DTrace to sample user-level stacks at 99 Hertz for processes named "mysqld", 
and then generates the flame graph

# dtrace -x ustackframes=100 -n 'profile-99 /execname == "mysqld" && arg1/ {
    @[ustack()] = count(); } tick-60s { exit(0); }' -o out.stacks
# ./stackcollapse.pl out.stacks > out.folded
# ./flamegraph.pl out.folded > out.svg