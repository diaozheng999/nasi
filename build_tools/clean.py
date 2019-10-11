
import shutil
import os
from barrel import clean, SOURCE_ROOT

if os.path.exists("dist"):
    print("Removing /dist...")
    shutil.rmtree("dist")
else:
    print("/dist does not exist.")
clean(SOURCE_ROOT)
