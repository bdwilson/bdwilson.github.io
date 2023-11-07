for i in *.*[jJpP][pPnN][gG]*; do echo "Processing $i"; exiftool -geotag= "$i"; done
rm -f *_original
