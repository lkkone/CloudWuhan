FROM caddy:alpine
COPY dist/ /srv/
EXPOSE 8080
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":8080"]
