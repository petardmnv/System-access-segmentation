import os
import sys
def writeResult(result, filename):
    filepath = '../public/result/'+filename
    try: 
        os.mkfifo(filepath)
    except:
        fifo_write = open(filepath, 'w')
        fifo_write.write((",".join(x for x in result)))
        fifo_write.flush()

result = ['one', 'two', 'three', 'four']
writeResult(result, 'result')