FROM ortussolutions/commandbox:latest

RUN cd /tmp && curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.11.1-amd64.deb && dpkg -i filebeat-7.11.1-amd64.deb && rm -f filebeat-7.11.1-amd64.deb

COPY filebeat.yml /etc/filebeat/filebeat.yml

CMD service filebeat start && $BUILD_DIR/run.sh