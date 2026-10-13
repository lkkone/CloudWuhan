FROM caddy:alpine
# Port 8080 needs no file capabilities; compatible with cap_drop: ALL.
RUN setcap -r /usr/bin/caddy
COPY dist/ /srv/
EXPOSE 8080
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":8080"]
