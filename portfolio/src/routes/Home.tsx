import ink from "../assets/img/ink.png";
import { copy } from "./homeCopy";
import Portrait from "../components/Portrait";
import Qualification from "../components/Qualifications";
import Section from "../components/Section";
import TitleSection from "../components/TitleSection";
import WorkExperience from "../components/WorkExperience";
import {
  titlePaint,
  aboutPaint,
  experiencePaint,
  qualificationPaint,
  footerPaint,
} from "../utils/colors";

export default function Home() {
  return (
    <>
      <TitleSection sprite={ink} paint={titlePaint} />
      <Section
        name="about"
        title="001 About"
        sprite={ink}
        paint={aboutPaint}
        className="
          flex
        "
      >
        <div
          className="
            flex flex-col
            items-center justify-center gap-6
          "
        >
          <div
            className="
              flex flex-row
              gap-x-4 items-center
            "
          >
            <div
              className="
                relative -left-6
              "
            >
              <Portrait
                paint={aboutPaint}
                className="
                  w-24 h-auto
                  outline-2 outline-offset-6 outline-amber-50
                  sm:w-60 sm:ml-4
                  md:ml-10
                "
              />
            </div>
            <div
              className="
                pr-9
              "
            >
              <h2
                className="
                  text-6xl font-body text-amber-50
                "
              >
                Hi&nbsp;~
              </h2>
              <div
                className="
                  flex-col hidden
                  max-w-140
                  py-16
                  text-amber-50 text-lg
                  gap-4
                  sm:flex
                "
              >
                <p>{copy.body[0]}</p>
                <p>{copy.body[1]}</p>
              </div>
            </div>
          </div>
          <div
            className="
              visible
              pl-18 pr-9
              text-amber-50
              sm:hidden
            "
          >
            <p>{copy.body[0]}</p>
            <p>{copy.body[1]}</p>
          </div>
        </div>
      </Section>
      <Section
        name="experience"
        title="002 Experience"
        sprite={ink}
        paint={experiencePaint}
      >
        <div
          className="
            flex flex-col
            w-full
            p-6 pl-20 py-[30vh]
            sm:pl-74
          "
        >
          <h1
            className="
              font-heading-1 text-neutral-900 text-3xl
              uppercase
              sm:text-5xl
            "
          >
            Experience
          </h1>
          <div
            className="
              flex flex-col
              max-w-140
              py-16
              gap-12
            "
          >
            {copy.experience.map((job) => (
              <WorkExperience key={`${job.id}`} job={job} />
            ))}
          </div>
        </div>
      </Section>
      <Section
        name="qualification"
        title="003 Qualification"
        sprite={ink}
        paint={qualificationPaint}
      >
        <div
          className="
            flex flex-col
            w-full
            p-6 pl-20 py-[30vh]
            sm:pl-74
          "
        >
          <h1
            className="
              font-heading-1 text-neutral-900 text-3xl
              uppercase
              sm:text-5xl
            "
          >
            Qualifications
          </h1>
          <div
            className="
              flex flex-col
              max-w-140
              py-16 pr-6
              gap-10
            "
          >
            {copy.qualifications.map((qualification) => (
              <Qualification
                key={`${qualification.opener.substring(0, 30)}`}
                qualification={qualification}
              />
            ))}
          </div>
        </div>
      </Section>
      <Section
        name="footer"
        title="004 Footer"
        sprite={ink}
        paint={footerPaint}
      >
        <div
          className="
            flex flex-col
            w-full
            p-6
            items-center justify-center gap-12
          "
        >
          {[
            {
              text: "in/benknize",
              href: "http://linkedin.com/in/benknize/",
            },
            {
              text: "bknize@gmail",
              href: "mailto:bknize@gmail.com",
            },
          ].map(({ text, href }) => (
            <a
              key={href}
              href={href}
              className="
                text-3xl
                link
              "
            >
              {text}
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
