FROM gcr.io/google_appengine/java-compat
VOLUME /tmp
ADD /build/libs/psa-feed-listeners-0.0.1-SNAPSHOT.jar app.jar
ADD /build/resources/main/gc-feed-listener-credentials.json .gc-feed-listener-credentials.json
ENV GOOGLE_APPLICATION_CREDENTIALS .gc-feed-listener-credentials.json 
ENV ACTIVE_SPRING_PROFILE ${SPRING_PROFILE:-default}
ENV iyotee.backend_svc_url https://backendsvc-dot-eng-contact-123917.appspot.com/_ah/api/psaBcknd/v1
RUN sh -c 'touch app.jar'
RUN sh -c 'java -version'
RUN sh -c 'ls -lrtg app.jar'
ENTRYPOINT ["java",\
	"-Djava.security.egd=file:/dev/./urandom",\
	"-Dspring.profiles.active=${ACTIVE_SPRING_PROFILE}",\
	"-jar","app.jar"]