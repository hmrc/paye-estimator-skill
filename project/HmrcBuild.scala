import sbt.Keys._
import sbt._
import uk.gov.hmrc.SbtAutoBuildPlugin
import uk.gov.hmrc.versioning.SbtGitVersioning
import com.typesafe.sbt.packager.Keys._
import com.typesafe.sbt.SbtNativePackager._
import com.typesafe.sbt.SbtNativePackager.autoImport._
import com.typesafe.sbt.packager.universal.UniversalPlugin

object HmrcBuild extends Build {

  import BuildDependencies._
  import uk.gov.hmrc.DefaultBuildSettings._
  import ZipFiles._

  val appName = "paye-estimator-ivr"

  lazy val PayeEstimatorIvr = Project(appName, file("."))
    .enablePlugins(SbtAutoBuildPlugin, SbtGitVersioning, UniversalPlugin)
    .settings(
      libraryDependencies ++= Seq(
        Test.scalaTest,
        Test.pegdown
      ),
      topLevelDirectory := None,
      mappings in Universal ++= zipFiles
    )
}

private object BuildDependencies {

  object Compile {
  }

  sealed abstract class Test(scope: String) {
    val scalaTest = "org.scalatest" %% "scalatest" % "2.2.4" % scope
    val pegdown = "org.pegdown" % "pegdown" % "1.5.0" % scope
  }

  object Test extends Test("test")

}

object ZipFiles {
  import NativePackagerHelper._

  val zipFiles = directory("node_modules") ++ directory("src/main/js/handlers") ++ Seq((file("src/main/js/TaxCalculatorIvr.js"), "TaxCalculatorIvr.js")) ++ Seq((file("src/main/js/index.js"), "index.js"))
}
