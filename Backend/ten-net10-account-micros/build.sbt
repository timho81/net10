val spring_boot_starter = "org.springframework.boot" % "spring-boot-starter" % "1.3.5.RELEASE"

val spring_boot_starter_web = "org.springframework.boot" % "spring-boot-starter-web" % "1.3.5.RELEASE"

val spring_boot_starter_test = "org.springframework.boot" % "spring-boot-starter-test" % "1.3.5.RELEASE"

val spring_data_mongodb = "org.springframework.data" % "spring-data-mongodb" % "1.9.1.RELEASE"

val spring_security_core = "org.springframework.security" % "spring-security-core" % "4.1.0.RELEASE"

val spring_security_web = "org.springframework.security" % "spring-security-web" % "4.1.0.RELEASE"

val spring_security_config = "org.springframework.security" % "spring-security-config" % "4.1.0.RELEASE"

lazy val commonSettings = Seq(
  organization := "com.duvall.ten",
  version := "0.0.1-SNAPSHOT",
  scalaVersion := "2.11.8"
)

lazy val root = (project in file(".")).
  settings(commonSettings: _*).
  settings(
    name := "duvall-ten-account-msvc",
    libraryDependencies ++= Seq(
		spring_boot_starter,
		spring_boot_starter_web,
		spring_boot_starter_test,
		spring_data_mongodb,
		spring_security_core,
		spring_security_web,
		spring_security_config
	)
  )