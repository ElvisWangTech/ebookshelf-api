#!/bin/bash
# start.sh
# start strapi with nohup 

nohup yarn develop > start.log 2>&1 &
