"use client";
import { motion } from "framer-motion";
import { card } from "../../public";
import { slideIn } from "../styles/animations";
import Button from "./Button";
import Image from "next/image";

const CardDeal = () => (
  <section className="section">
    <motion.div
      className="sectionInfo"
      variants={slideIn("left", "tween", 0.2, 1.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h2 className="heading2">
      Daten verstreut <br className="sm:block hidden" /> in unzähligen Ordnern?
      </h2>
      <p className="paragraph max-w-[470px] mt-5">
      Unser CRM bündelt all Ihre Daten an einem zentralen Ort – keine verstreuten Informationen mehr. Kundenkontakte, Projekte und Beurteilungen sind leicht zugänglich, aktualisierbar und teilbar. So sparen Sie Zeit, reduzieren Fehler und arbeiten effizienter!
      </p>

      <Button styles={`mt-10`} />
    </motion.div>

    <motion.div
      className="sectionImg"
      variants={slideIn("right", "tween", 0.2, 1.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Image
        src={card}
        width={0}
        height={0}
        alt="billing"
        className="w-[100%] h-[100%]"
      />
    </motion.div>
  </section>
);

export default CardDeal;
