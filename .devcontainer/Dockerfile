FROM node:lts

ARG USERNAME=scotthal
ARG USER_UID=1100
ARG USER_GID=$USER_UID

ENV DEBIAN_FRONTEND=noninteractive

RUN \
  apt-get update; \
  apt-get -y install locales less dialog apt-utils man-db bc zsh zip unzip sudo vim git lsb-release curl httpie jq; \
  apt-get -y dist-upgrade; \
  echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen; \
  locale-gen; \
  update-locale LANG=en_US.UTF-8; \
  curl -L https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - ; \
  echo "deb http://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/5.0 main" > /etc/apt/sources.list.d/mongodb-org-5.0.list; \
  apt-get update; \
  apt-get -y install mongodb-org-shell; \
  curl -L https://downloads.mongodb.com/compass/mongodb-mongosh_1.5.0_amd64.deb > /tmp/mongosh.deb; \
  dpkg -i /tmp/mongosh.deb; \
  rm -f /tmp/mongosh.deb; \
  curl -L https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian10-x86_64-100.5.3.deb > /tmp/mongotools.deb; \
  dpkg -i /tmp/mongotools.deb; \
  rm -f /tmp/mongotools.deb; \
  groupadd --gid $USER_GID $USERNAME; \
  useradd -s /bin/zsh --uid $USER_UID --gid $USER_GID -m $USERNAME; \
  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME; \
  chmod 440 /etc/sudoers.d/$USERNAME; \  apt-get autoremove -y; \
  apt-get clean -y; \
  rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=

USER ${USERNAME}

CMD ["/bin/zsh", "-l"]
