FROM nginx:stable

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
	apt-get -y --no-install-recommends install wget ca-certificates && \
    wget https://raw.githubusercontent.com/visionmedia/n/master/bin/n -O /usr/local/bin/n && \
    chmod +x /usr/local/bin/n && \
    n 10

ENV NODE_ENV production
WORKDIR /opt
ADD package.json /opt
ADD package-lock.json /opt
RUN npm install

COPY ./ /opt

RUN rm -rf /usr/share/nginx/html && \
    ln -s /opt/dist /usr/share/nginx/html

ENTRYPOINT ["/opt/entrypoint.sh"]
