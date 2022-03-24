FROM mongo
EXPOSE 27017
#image
VOLUME [ "/var/lib/mongo" ]