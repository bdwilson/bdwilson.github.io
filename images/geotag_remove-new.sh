for i in *.*[jJpP][pPnN][gG]*; do 
	find $i -mtime -2 | grep [jJpP][pPnN][gG]*
	if [ $? -eq 0 ]; then
		echo "Processing $i"
	    exiftool -geotag= "$i";
		rm -f *_original
	fi
done
