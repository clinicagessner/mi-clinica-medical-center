import type { ServiceFaq } from "@/types";

/**
 * FAQs por servicio (clave = slug). Bilingüe. Se usan en la página de
 * detalle del servicio y para el JSON-LD FAQPage.
 */
export const SERVICE_FAQS: Record<string, ServiceFaq[]> = {
  "condiciones-cronicas": [
    {
      "question": "¿Debo venir en ayunas a mi control de diabetes o colesterol?",
      "answer": "Si te van a medir colesterol y triglicéridos o la glucosa en ayunas, lo ideal es no comer nada en las 8 a 12 horas previas; agua sí puedes tomar. Toma tus medicamentos de la presión como de costumbre, salvo que te indiquemos otra cosa.",
      "questionEn": "Should I fast before my diabetes or cholesterol follow-up?",
      "answerEn": "If your visit includes a cholesterol and triglyceride panel or a fasting glucose, skip food for 8 to 12 hours beforehand; water is fine. Keep taking your blood pressure pills as usual unless we tell you otherwise."
    },
    {
      "question": "¿Pueden seguir con el tratamiento que me recetaron en mi país?",
      "answer": "Trae los frascos o la caja de cada medicamento. El equipo médico revisa la sustancia y la dosis, pide los análisis necesarios y te indica si conviene mantenerlo o cambiarlo por un equivalente disponible aquí.",
      "questionEn": "Can you continue the treatment I was prescribed in my home country?",
      "answerEn": "Bring the bottle or box of each medication. The medical team checks the active ingredient and dose, orders the labs you need and tells you whether to keep it or switch to an equivalent available here."
    },
    {
      "question": "¿Qué pasa si mi presión sale muy alta en la clínica?",
      "answer": "Te la volvemos a medir después de unos minutos de reposo para confirmarla. Si sigue elevada, el equipo médico revisa tus síntomas, ajusta el tratamiento ese mismo momento y te indica cuándo volver para comprobar que bajó.",
      "questionEn": "What happens if my blood pressure reads very high at the clinic?",
      "answerEn": "We take it again after you rest for a few minutes to confirm the reading. If it stays high, the medical team reviews your symptoms, adjusts your treatment during that visit and tells you when to come back for a recheck."
    }
  ],
  "tiroides": [
    {
      "question": "¿Tengo que ir en ayunas para el examen de tiroides?",
      "answer": "La TSH, la T3 y la T4 por lo general no exigen ayuno. Si ya tomas levotiroxina, lo habitual es tomar la muestra antes de la pastilla de esa mañana; si vas a sumar glucosa o colesterol en la misma toma, sí conviene ir en ayunas.",
      "questionEn": "Does the TSH, T3 and T4 draw require an empty stomach?",
      "answerEn": "TSH, T3 and T4 usually don't require fasting. If you already take levothyroxine, the sample is normally drawn before that morning's pill; if you're adding glucose or cholesterol to the same draw, then do come fasting."
    },
    {
      "question": "¿Cada cuánto hay que repetir la TSH después de empezar el tratamiento?",
      "answer": "Tras iniciar o cambiar la dosis, la TSH suele repetirse a las 6 a 8 semanas, que es lo que tarda el cuerpo en estabilizarse. Cuando los valores ya están en rango, los controles se espacian según lo indique el equipo médico.",
      "questionEn": "How often is TSH rechecked after starting treatment?",
      "answerEn": "After starting or changing a dose, TSH is usually rechecked at 6 to 8 weeks, the time your body needs to settle. Once your levels are in range, the medical team spaces out the follow-up checks."
    },
    {
      "question": "¿Un problema de tiroides puede afectar el embarazo o el ciclo menstrual?",
      "answer": "Sí. Un desajuste de tiroides puede alterar la regularidad de la regla y conviene tenerlo controlado si buscas un embarazo o ya estás embarazada. Cuéntanoslo en la consulta para tenerlo en cuenta al revisar tus valores y tu dosis.",
      "questionEn": "Can a thyroid problem affect pregnancy or my menstrual cycle?",
      "answerEn": "Yes. A thyroid imbalance can make your periods irregular, and it should be well controlled if you're trying to conceive or are already pregnant. Mention it during the visit so it's factored into how we read your levels and set your dose."
    }
  ],
  "alergias": [
    {
      "question": "¿Debo dejar de tomar mi antihistamínico antes de la consulta?",
      "answer": "No hace falta suspenderlo para la consulta de alergias. Solo apunta el nombre del producto, la dosis y desde cuándo lo usas, porque saber cómo has respondido ayuda al equipo médico a elegir el siguiente tratamiento.",
      "questionEn": "Should I stop my antihistamine before the visit?",
      "answerEn": "You don't need to stop it for the allergy visit. Just note the product name, the dose and how long you've been taking it, since knowing how you responded helps the medical team pick the next treatment."
    },
    {
      "question": "¿Qué hago si me salen ronchas y no sé qué las causó?",
      "answer": "Toma fotos de las ronchas si desaparecen antes de la consulta y anota lo que comiste, los medicamentos que tomaste y los productos nuevos que usaste ese día. Si además se te hinchan los labios o te cuesta respirar, acude a emergencias de inmediato.",
      "questionEn": "What should I do if I break out in hives and don't know why?",
      "answerEn": "Take photos of the hives in case they fade before your visit, and write down what you ate, any medicine you took and any new products you used that day. If your lips swell or breathing gets hard, go to the emergency room right away."
    },
    {
      "question": "¿Atienden alergias en niños?",
      "answer": "Sí, revisamos la rinitis, los ojos irritados y las ronchas también en niños. Conviene que venga acompañado de su madre, padre o tutor y que traigan la lista de cualquier medicamento o jarabe que ya le hayan dado.",
      "questionEn": "Do you see children with allergies?",
      "answerEn": "Yes, we also check rhinitis, irritated eyes and hives in children. The child should come with a parent or guardian, and it helps to bring a list of any medicine or syrup they've already been given."
    }
  ],
  "enfermedades-respiratorias": [
    {
      "question": "¿Cuándo conviene hacerse la prueba de COVID si los síntomas apenas empezaron?",
      "answer": "Puedes hacértela desde el primer día de síntomas. Si la prueba rápida sale negativa pero la fiebre o la tos continúan, el equipo médico puede indicarte repetirla uno o dos días después, porque al inicio el virus a veces todavía no se detecta.",
      "questionEn": "When should I get a COVID test if my symptoms just started?",
      "answerEn": "You can be tested from the first day of symptoms. If the rapid test is negative but the fever or cough continues, the medical team may ask you to repeat it a day or two later, since the virus is sometimes not detectable that early."
    },
    {
      "question": "¿Qué pasa si la prueba de flu sale positiva?",
      "answer": "El equipo médico decide si te conviene un antiviral, sobre todo cuando los síntomas empezaron hace poco o tienes una condición crónica. Además te explica cómo controlar la fiebre en casa y cuánto tiempo mantenerte apartado de los demás para no contagiar.",
      "questionEn": "What happens if my flu test comes back positive?",
      "answerEn": "The medical team decides whether an antiviral makes sense for you, especially if your symptoms began recently or you have a chronic condition. You also get guidance on managing the fever at home and how long to keep away from others."
    },
    {
      "question": "¿Puedo traer a toda la familia si varios tenemos fiebre y tos?",
      "answer": "Sí. Cada persona se revisa por separado y se le hace su propia prueba rápida de flu o COVID, porque en una misma casa pueden circular virus distintos. Así el tratamiento y los días de reposo se indican para cada quien.",
      "questionEn": "Can the whole family come in if several of us have fever and a cough?",
      "answerEn": "Yes. Each person is examined on their own and gets a separate rapid flu or COVID test, since different viruses can be going around the same household. That way treatment and rest days are set for each patient."
    }
  ],
  "examen-fisico-escolar": [
    {
      "question": "¿El menor tiene que venir acompañado de un adulto?",
      "answer": "Sí, los menores de edad deben venir con su madre, padre o tutor legal, porque hace falta su firma en el formulario y sus respuestas sobre antecedentes familiares de salud. Si el formulario tiene una parte para los padres, llénala antes de llegar.",
      "questionEn": "Does a minor need to come with an adult?",
      "answerEn": "Yes, minors must come with a parent or legal guardian, since their signature is needed on the form along with answers about family health history. If the form has a section for parents, fill it out before you arrive."
    },
    {
      "question": "¿Qué ropa conviene llevar para el examen deportivo?",
      "answer": "Ropa cómoda y holgada, como pants o shorts y una camiseta, y tenis. Así es más fácil revisar la columna, las rodillas y los tobillos y hacer las pruebas de movimiento que piden muchos formularios deportivos.",
      "questionEn": "What should my child wear to a sports physical?",
      "answerEn": "Comfortable, loose clothes such as sweatpants or shorts with a T-shirt, plus sneakers. That makes it easier to check the spine, knees and ankles and do the movement tests that many sports forms ask for."
    },
    {
      "question": "¿Pueden hacer el examen físico a varios hermanos en la misma visita?",
      "answer": "Sí. Cada niño recibe su propia revisión completa y su propio formulario, así que trae el documento de cada escuela o equipo. Llegar temprano ayuda cuando son varios, sobre todo en las semanas antes del regreso a clases.",
      "questionEn": "Can several siblings get their physicals in the same visit?",
      "answerEn": "Yes. Each child gets a full exam and a separate form, so bring the paperwork for each school or team. Arriving early helps when you have several kids, especially in the weeks before school starts."
    }
  ],
  "ginecologia": [
    {
      "question": "¿Qué conviene evitar antes de hacerte el papanicolaou?",
      "answer": "Durante los dos días previos evita las duchas vaginales, los óvulos o cremas vaginales y las relaciones sexuales, porque pueden alterar la muestra. Lo ideal es venir cuando no estés en tus días de regla; si el sangrado es leve, consúltanos antes.",
      "questionEn": "What should you avoid before a Pap smear?",
      "answerEn": "For two days beforehand, skip douching, vaginal suppositories or creams, and intercourse, since they can affect the sample. It's best to come when you're not on your period; if the bleeding is light, check with us first."
    },
    {
      "question": "¿Qué pasa si el cultivo vaginal confirma una infección?",
      "answer": "El equipo médico te indica el tratamiento según el tipo de infección que muestre el cultivo, ya sea por hongos o por bacterias, y te explica cómo usarlo. Si te indican óvulos, crema o pastillas, puedes recogerlos antes de salir en la farmacia de la clínica.",
      "questionEn": "What happens if the vaginal culture confirms an infection?",
      "answerEn": "The medical team prescribes treatment based on the type of infection the culture shows, whether yeast or bacteria, and explains how to use it. Whether it's suppositories, a cream or pills, you can pick up what was prescribed at the clinic pharmacy on your way out."
    },
    {
      "question": "¿Puedo hacerme el papanicolaou si estoy embarazada?",
      "answer": "En general sí, la toma de muestra se puede hacer durante el embarazo con cuidado. Avísanos de cuántas semanas estás antes de la revisión, para que el personal médico decida si conviene hacerlo en esa visita o esperar.",
      "questionEn": "Can I get a Pap smear while pregnant?",
      "answerEn": "In general yes, the sample can be taken gently during pregnancy. Tell us how many weeks along you are before the exam so the medical staff can decide whether to do it at that visit or wait."
    }
  ],
  "prueba-embarazo": [
    {
      "question": "¿Cuántos días después del retraso conviene hacerse la prueba de embarazo?",
      "answer": "Con un día de retraso de la regla, la orina ya suele tener suficiente hormona para que la prueba rápida la detecte. Si vienes antes, la prueba en sangre puede detectar niveles más bajos de la hormona; el equipo médico te ayuda a elegir según tu caso.",
      "questionEn": "How long after a missed period should I take a pregnancy test?",
      "answerEn": "Once your period is a day late, your urine usually carries enough hormone for the rapid test to pick it up. If you come in earlier, a blood test can pick up lower hormone levels, and the medical team will help you choose the right one."
    },
    {
      "question": "¿Sirve más la primera orina de la mañana?",
      "answer": "Sí, la primera orina del día suele estar más concentrada y facilita detectar la hormona en un embarazo temprano. Si vienes más tarde, procura no tomar mucha agua en las horas previas para que la muestra no quede muy diluida.",
      "questionEn": "Is first-morning urine better for the test?",
      "answerEn": "Yes, your first urine of the day is usually more concentrated, which makes the hormone easier to detect early on. If you come later, try not to drink a lot of water in the hours before so the sample isn't too diluted."
    },
    {
      "question": "¿Los anticonceptivos o los antibióticos alteran el resultado?",
      "answer": "No. Las pastillas anticonceptivas, la inyección y los antibióticos comunes no cambian lo que mide la prueba, que es la hormona del embarazo. Solo algunos tratamientos de fertilidad que contienen esa hormona pueden dar un falso positivo; si los usas, dínoslo.",
      "questionEn": "Can birth control or antibiotics affect the result?",
      "answerEn": "No. Birth control pills, the shot and common antibiotics don't change what the test measures, which is the pregnancy hormone. Only certain fertility treatments that contain that hormone can cause a false positive, so tell us if you're using one."
    }
  ],
  "anticonceptivos": [
    {
      "question": "¿Cada cuánto se pone la inyección anticonceptiva?",
      "answer": "La inyección más usada se aplica cada tres meses. Al ponértela te anotamos la fecha de la siguiente dosis; si te pasas varios días, conviene usar condón mientras tanto y avisarnos para revisar si hace falta una prueba de embarazo antes de aplicarla.",
      "questionEn": "How often do I need the birth control shot?",
      "answerEn": "The most common shot is given every three months. When you get it, we write down the date of your next dose; if you're several days late, use condoms in the meantime and let us know so we can check whether a pregnancy test is needed first."
    },
    {
      "question": "¿Desde qué día me protege la pastilla anticonceptiva?",
      "answer": "Si empiezas la pastilla en los primeros días de tu regla, suele proteger desde el inicio; si la empiezas en otro momento del ciclo, se recomienda usar condón durante los primeros siete días. En la consulta te explicamos la regla exacta de tu pastilla.",
      "questionEn": "When does the birth control pill start protecting me?",
      "answerEn": "If you start the pill during the first days of your period, it usually protects you right away; if you start at another point in your cycle, use condoms for the first seven days. At the visit we explain the exact rule for your pill."
    },
    {
      "question": "¿Puedo usar anticonceptivos si estoy amamantando?",
      "answer": "Sí, aunque no todos son adecuados durante la lactancia. Algunos métodos con estrógeno pueden reducir la leche, así que el equipo médico te orienta hacia opciones compatibles según la edad de tu bebé.",
      "questionEn": "Can I use birth control while breastfeeding?",
      "answerEn": "Yes, though not every method is a good fit while nursing. Some estrogen-containing options can lower milk supply, so the medical team points you to compatible choices based on your baby's age."
    }
  ],
  "extraccion-implantes": [
    {
      "question": "¿Qué hago si ya no siento el implante bajo la piel?",
      "answer": "Ven igual y avísanos al llegar. A veces el implante está más profundo o se movió un poco; el personal médico revisa el brazo con cuidado y, si no se puede localizar al tacto, te orientamos con la referencia para un estudio que lo ubique antes de retirarlo.",
      "questionEn": "What if I can no longer feel the implant under my skin?",
      "answerEn": "Come in anyway and mention it when you arrive. Sometimes the implant sits deeper or has shifted slightly; the medical staff examines the arm carefully and, if it can't be found by touch, helps you with a referral for imaging to locate it before removal."
    },
    {
      "question": "¿Puedo trabajar o hacer ejercicio después de quitarme el implante?",
      "answer": "La mayoría de las pacientes vuelve a su trabajo ese mismo rato, sobre todo si es de oficina. Si tu trabajo exige cargar peso o haces ejercicio intenso con los brazos, conviene esperar unos días a que cierre la herida.",
      "questionEn": "Can I go back to work or exercise after the implant is removed?",
      "answerEn": "Most patients return to work right afterward, especially with a desk job. If your work involves heavy lifting or you do intense arm workouts, wait a few days for the wound to close first."
    },
    {
      "question": "¿Se puede retirar el implante antes de que caduque?",
      "answer": "Sí, puedes pedir que te lo quiten en cualquier momento, sin importar cuántos meses o años lleve puesto. Los motivos más comunes son sangrados irregulares que molestan, querer embarazarse o preferir otro método anticonceptivo.",
      "questionEn": "Can the implant be removed before it expires?",
      "answerEn": "Yes, you can have it taken out at any time, no matter how long it has been in place. The most common reasons are bothersome irregular bleeding, wanting to get pregnant or preferring a different birth control method."
    }
  ],
  "salud-hombre": [
    {
      "question": "¿A qué hora del día conviene tomar la muestra del análisis hormonal?",
      "answer": "La testosterona suele estar más alta en la mañana, por eso lo recomendable es que la muestra se tome temprano, antes del mediodía. Si el primer valor sale bajo, el equipo médico normalmente pide repetirlo para confirmarlo antes de decidir cualquier tratamiento.",
      "questionEn": "What time of day is best for the hormone blood draw?",
      "answerEn": "Testosterone tends to peak in the morning, so it's best to have the sample drawn early, before noon. If the first reading comes back low, the medical team usually repeats it to confirm before deciding on any treatment."
    },
    {
      "question": "¿Hay algo que deba evitar antes del análisis de PSA?",
      "answer": "Durante los dos días anteriores conviene evitar las relaciones sexuales y el ciclismo o andar mucho en bicicleta, porque pueden subir el PSA de forma pasajera. Si tienes una infección urinaria activa, avísanos: también puede alterar el resultado.",
      "questionEn": "Is there anything I should avoid before a PSA test?",
      "answerEn": "For two days beforehand, avoid ejaculation and long bike rides, since both can raise PSA temporarily. If you have an active urinary infection, tell us, because it can also throw off the result."
    },
    {
      "question": "¿Qué significa tener el PSA alto?",
      "answer": "Un PSA elevado no es un diagnóstico por sí solo: puede subir por inflamación, infección o crecimiento benigno de la próstata. El equipo médico revisa el valor junto con tu edad y tus síntomas y, si un resultado lo requiere, te orientamos con la referencia al especialista.",
      "questionEn": "What does a high PSA mean?",
      "answerEn": "A raised PSA is not a diagnosis on its own: inflammation, infection or a benign enlarged prostate can all push it up. The medical team weighs the number against your age and symptoms and, if a result calls for it, helps you with a specialist referral."
    }
  ],
  "examenes-sangre": [
    {
      "question": "¿Puedo tomar mis medicinas antes del análisis si vengo en ayunas?",
      "answer": "En general sí, con un poco de agua simple, salvo que el equipo médico te indique otra cosa. Lo que conviene evitar es el café con azúcar, los jugos y la comida. Trae anotados los nombres de tus medicamentos para que se tomen en cuenta al leer los valores.",
      "questionEn": "Can I take my medications before the blood draw if I'm fasting?",
      "answerEn": "Usually yes, with a little plain water, unless the medical team tells you otherwise. What you should skip is sweetened coffee, juice and food. Bring the names of your medications written down so they're taken into account when your values are read."
    },
    {
      "question": "¿Qué diferencia hay entre la glucosa y la A1C?",
      "answer": "La glucosa muestra cómo está tu azúcar en el momento de la toma, y por eso se pide en ayunas. La A1C refleja el promedio de los últimos meses, así que es muy útil para detectar diabetes o ver si un tratamiento está funcionando.",
      "questionEn": "What's the difference between glucose and A1C?",
      "answerEn": "Glucose shows your blood sugar at the moment of the draw, which is why it's done fasting. A1C reflects your average over the past few months, so it's especially useful for spotting diabetes or seeing whether a treatment is working."
    },
    {
      "question": "¿Me sirven estos análisis para un examen que pide mi trabajo?",
      "answer": "Muchas veces sí. Trae el formulario o la lista de pruebas que te pidió tu empleador o escuela para que la orden coincida exactamente con lo solicitado. Si falta algún dato en el documento, te ayudamos a revisar qué necesitan.",
      "questionEn": "Can this lab work count for an exam my job requires?",
      "answerEn": "Often, yes. Bring the form or test list your employer or school gave you so the lab order matches exactly what they asked for. If the document leaves something unclear, we help you figure out what they need."
    }
  ],
  "infecciones-urinarias": [
    {
      "question": "¿Cómo debo recoger la muestra de orina?",
      "answer": "Te damos un recipiente estéril en la clínica. Lávate las manos y la zona genital, deja ir el primer chorro al inodoro y recoge la orina de la mitad; ayuda llegar sin haber orinado en la última hora.",
      "questionEn": "How should I collect the urine sample?",
      "answerEn": "We give you a sterile cup at the clinic. Wash your hands and genital area, let the first stream go into the toilet and catch the middle portion; it helps if you have not urinated during the past hour."
    },
    {
      "question": "¿Qué pasa si sigo con molestias después del tratamiento?",
      "answer": "Regresa para que te revisemos de nuevo. El equipo médico puede pedir un urocultivo, que identifica la bacteria y el antibiótico que mejor la combate; como tarda más que el examen de orina, te avisamos en cuanto esté el resultado.",
      "questionEn": "What if I still have symptoms after the treatment?",
      "answerEn": "Come back so we can check you again. The medical team may order a urine culture, which identifies the bacteria and the antibiotic that fights it best; since it takes longer than the urine test, we contact you once the result is in."
    },
    {
      "question": "¿Pueden tratarme una infección urinaria si estoy embarazada?",
      "answer": "Sí, pero dilo desde que llegues. En el embarazo la infección urinaria no debe dejarse pasar, y el equipo médico elige un medicamento seguro para ti y para el bebé. Si no sabes si estás embarazada, podemos hacerte una prueba rápida.",
      "questionEn": "Can you treat a UTI if I am pregnant?",
      "answerEn": "Yes, just mention it as soon as you arrive. A urinary infection during pregnancy should not be ignored, and the medical team chooses a medicine that is safe for you and the baby. If you are unsure whether you are pregnant, we can run a rapid test."
    }
  ],
  "examen-heces": [
    {
      "question": "¿Cuánto tiempo puede pasar entre juntar la muestra y entregarla?",
      "answer": "Lo ideal es traerla a la clínica en pocas horas. Si no puedes salir enseguida, guarda el frasco bien cerrado en el refrigerador, nunca en el congelador, y avísanos al entregarlo a qué hora la recolectaste.",
      "questionEn": "How long can I wait between collecting the sample and dropping it off?",
      "answerEn": "Ideally, bring it to the clinic within a few hours. If you can't head out right away, keep the tightly closed container in the fridge, never the freezer, and tell us what time you collected it when you drop it off."
    },
    {
      "question": "¿Mi hijo pequeño puede hacerse el examen de heces?",
      "answer": "Sí. En bebés que usan pañal la muestra se toma del pañal con la paleta del frasco, evitando la parte mojada por orina. Es una de las formas más comunes de confirmar parásitos en niños con diarrea, dolor de panza o comezón al dormir.",
      "questionEn": "Can my young child have a stool test?",
      "answerEn": "Yes. For babies in diapers, the sample is scooped straight from the diaper with the container's spoon, avoiding any part soaked with urine. It's one of the most common ways to confirm parasites in kids with diarrhea, tummy aches or itching at night."
    },
    {
      "question": "Si sale un parásito, ¿toda la familia necesita tratamiento?",
      "answer": "Depende del parásito. Con algunos, como las lombrices que causan comezón, suele indicarse tratar a todos en casa porque se contagian fácil. El equipo médico te dice en tu caso quién debe tomarlo y qué medidas de higiene seguir.",
      "questionEn": "If a parasite shows up, does the whole family need treatment?",
      "answerEn": "It depends on the parasite. With some, like the pinworms that cause itching, treating everyone at home is often recommended because they spread easily. The medical team tells you who should take it in your case and which hygiene steps to follow."
    }
  ],
  "prueba-strep": [
    {
      "question": "¿Conviene tomar algo para el dolor antes de la prueba de strep?",
      "answer": "Puedes tomar un analgésico de venta libre para la fiebre, pero evita las pastillas o enjuagues para la garganta justo antes de venir. Tampoco empieces antibióticos que tengas en casa, porque pueden alterar el resultado del hisopado.",
      "questionEn": "Should I take something for the pain before the strep test?",
      "answerEn": "An over-the-counter pain or fever reliever is fine, but avoid throat lozenges or mouthwash right before you come in. Don't start leftover antibiotics from home either, since they can throw off the swab result."
    },
    {
      "question": "¿Cuándo deja de contagiar el estreptococo después de empezar el antibiótico?",
      "answer": "Por lo general, una persona deja de contagiar después de un día completo de antibiótico y sin fiebre. Por eso te indicamos cuándo tu hijo puede volver a la escuela y cuándo tú puedes regresar al trabajo sin riesgo para los demás.",
      "questionEn": "When does strep stop being contagious after starting antibiotics?",
      "answerEn": "Generally, a person stops being contagious after a full day on antibiotics without fever. That's why we tell you when your child can return to school and when you can go back to work without putting others at risk."
    },
    {
      "question": "¿La prueba rápida sirve para adultos o solo para niños?",
      "answer": "Sirve para los dos. El estreptococo es más frecuente en niños en edad escolar, pero los adultos también se contagian, sobre todo los papás y quienes trabajan con niños. El hisopado es el mismo y el resultado está en minutos.",
      "questionEn": "Is the rapid test for adults or only for kids?",
      "answerEn": "It works for both. Strep is more common in school-age children, but adults catch it too, especially parents and people who work with kids. The swab is the same, and the result is ready in minutes."
    }
  ],
  "prueba-tuberculosis": [
    {
      "question": "¿Qué pasa si no puedo volver a tiempo para la lectura de la PPD?",
      "answer": "La lectura solo es válida entre 48 y 72 horas después de aplicarla. Si no regresas en ese rango, la prueba ya no cuenta y hay que aplicar una nueva, así que elige un día de aplicación que te deje volver a los 2 o 3 días.",
      "questionEn": "What if I can't make it back in time for the PPD reading?",
      "answerEn": "The reading is only valid 48 to 72 hours after placement. If you miss that window, the test no longer counts and a new one has to be placed, so pick a placement day that lets you come back 2 or 3 days later."
    },
    {
      "question": "Me pusieron la vacuna BCG de niño, ¿puedo hacerme la PPD?",
      "answer": "Sí, la vacuna BCG no impide hacerse la prueba. Sin embargo, puede hacer que la reacción salga positiva aunque no tengas infección, por eso es importante que lo digas antes de la aplicación para que la lectura se interprete correctamente.",
      "questionEn": "Can I take the PPD if I was vaccinated with BCG as a child?",
      "answerEn": "Yes, the BCG vaccine doesn't prevent you from taking the test. It can, however, make the reaction come out positive even without infection, so mention it before placement so the reading is interpreted correctly."
    },
    {
      "question": "¿Qué dato debe traer el comprobante para mi escuela o trabajo?",
      "answer": "Normalmente piden la fecha de aplicación, la fecha de lectura, la medida en milímetros y si el resultado fue negativo o positivo. Todo eso viene en el comprobante que te entregamos; si tu institución usa un formulario propio, tráelo para llenarlo en la lectura.",
      "questionEn": "What should the record include for my school or job?",
      "answerEn": "Most ask for the placement date, the reading date, the measurement in millimeters and whether the result was negative or positive. All of that is on the record we give you; if your institution has its own form, bring it to be filled out at the reading."
    }
  ],
  "enfermedades-transmision-sexual": [
    {
      "question": "¿Es demasiado pronto hacerme la prueba unos días después del contacto?",
      "answer": "No necesariamente. Si tienes síntomas, ven cuanto antes. Si no los tienes, algunas infecciones se detectan mejor después de unas semanas, así que en la consulta revisamos la fecha de la exposición y te decimos qué pruebas tienen sentido ahora y cuáles repetir más adelante.",
      "questionEn": "Is it too early to test just a few days after an exposure?",
      "answerEn": "Not necessarily. If you have symptoms, come in right away. If you don't, some infections show up more reliably after a few weeks, so at the visit we review the date of contact and tell you which tests make sense now and which to repeat later."
    },
    {
      "question": "¿Debo orinar antes de venir a la prueba de ETS?",
      "answer": "Mejor no. Para la muestra de orina se usa la primera parte del chorro, así que ayuda llegar sin haber orinado al menos una hora antes. Tampoco hace falta ayuno, y las mujeres pueden hacerse la prueba aunque estén en su periodo, avisándonos.",
      "questionEn": "Should I avoid urinating before my STD test?",
      "answerEn": "Yes, ideally. The urine sample uses the first part of the stream, so it helps to arrive without having peed for at least an hour. No fasting is needed, and women can still be tested during their period, just let us know."
    },
    {
      "question": "¿Mi pareja también tiene que hacerse la prueba si yo salgo positivo?",
      "answer": "Sí, es lo recomendable. Aunque tú termines el tratamiento, si tu pareja no se revisa y se trata pueden volver a contagiarse entre ustedes. Te explicamos cómo hablarlo y cuánto tiempo evitar relaciones hasta que los dos terminen el tratamiento.",
      "questionEn": "Does my partner need testing too if my result is positive?",
      "answerEn": "Yes, that's the recommendation. Even if you finish your treatment, you can pass the infection back and forth if your partner isn't checked and treated. We explain how to bring it up and how long to avoid sex until you've both finished treatment."
    }
  ],
  "examen-alcohol-drogas": [
    {
      "question": "¿Beber litros de agua antes de dar la muestra de orina es buena idea?",
      "answer": "No conviene. Beber grandes cantidades de agua justo antes diluye la orina, y una muestra demasiado diluida puede no ser válida y obligarte a repetir la prueba. Toma líquidos como en un día normal y llega con ganas moderadas de orinar.",
      "questionEn": "Should I drink a lot of water before the drug test?",
      "answerEn": "It's better not to. Drinking large amounts of water right beforehand dilutes your urine, and an overly diluted sample may be rejected, which means repeating the test. Drink as you normally would and arrive needing to pee a little."
    },
    {
      "question": "¿Qué identificación tengo que presentar?",
      "answer": "Una identificación vigente con foto, como licencia de manejo, pasaporte o identificación consular. El nombre debe coincidir con el que aparece en la orden de tu empleador, porque así queda registrado en la documentación del resultado.",
      "questionEn": "What ID do I need to bring?",
      "answerEn": "A current photo ID, such as a driver's license, passport or consular ID card. The name should match the one on your employer's order, since that is how it appears on the result paperwork."
    },
    {
      "question": "¿Qué pasa si no puedo orinar cuando me toca dar la muestra?",
      "answer": "A mucha gente los nervios le bloquean las ganas de orinar justo en ese momento. Te pedimos que esperes en la clínica y tomes un poco de agua hasta que puedas dar la muestra; según el procedimiento que pida tu empleador, salir y volver más tarde puede obligar a empezar de nuevo.",
      "questionEn": "What if I can't urinate when it's time to give the sample?",
      "answerEn": "It happens more often than you'd think, usually from nerves. We ask you to wait at the clinic and sip some water until you're able to give the sample; depending on your employer's procedure, leaving and coming back later may mean starting over."
    }
  ],
  "electrocardiograma": [
    {
      "question": "¿Puedo hacerme el electrocardiograma si tengo vello en el pecho?",
      "answer": "Sí. A veces hace falta rasurar pequeñas áreas para que los electrodos peguen bien y el trazo salga limpio; el personal médico lo hace en el momento si es necesario. No tienes que rasurarte en casa antes de venir.",
      "questionEn": "Can I get an EKG if I have chest hair?",
      "answerEn": "Yes. Sometimes small spots need to be shaved so the electrodes stick and the tracing comes out clean; our medical staff takes care of it at the visit if needed. There's no need to shave at home beforehand."
    },
    {
      "question": "Si mi electro sale normal, ¿ya no tengo que preocuparme por mi corazón?",
      "answer": "No del todo. El EKG muestra cómo está el ritmo y la actividad eléctrica mientras dura el registro, pero algunas molestias aparecen solo con esfuerzo o de forma ocasional. Por esa razón el equipo médico lo valora junto con lo que sientes, tu presión arterial y tus resultados de laboratorio.",
      "questionEn": "If my EKG is normal, can I stop worrying about my heart?",
      "answerEn": "Not entirely. The EKG shows your rhythm and electrical activity during the recording, but some problems only appear with exertion or come and go. That's why it's read together with your symptoms, blood pressure and lab work."
    },
    {
      "question": "¿Me dan una copia del electrocardiograma para mi cirugía o mi trabajo?",
      "answer": "Sí, te entregamos el trazo con su interpretación para que lo lleves a tu cirujano, a tu empleador o al programa deportivo que lo pide. Si te dieron un formulario específico, tráelo y lo llenamos durante la consulta.",
      "questionEn": "Do I get a copy of the EKG for my surgery or job?",
      "answerEn": "Yes, we give you the tracing with its interpretation to take to your surgeon, employer or the sports program that requested it. If you were given a specific form, bring it along and we'll fill it out during the visit."
    }
  ],
  "ultrasonido": [
    {
      "question": "¿Tengo que venir con la vejiga llena para el ultrasonido pélvico?",
      "answer": "Para el ultrasonido pélvico suele pedirse la vejiga llena, porque ayuda a ver mejor el útero y los ovarios. Llama antes de tu visita y te decimos cuánta agua tomar y cuánto tiempo antes, según el estudio que te toque.",
      "questionEn": "Should I drink water before a pelvic ultrasound?",
      "answerEn": "A full bladder is usually requested for a pelvic ultrasound because it gives a clearer view of the uterus and ovaries. Call before your visit and we'll tell you how much water to drink and when, depending on your study."
    },
    {
      "question": "¿Por qué piden ayuno para el ultrasonido abdominal?",
      "answer": "Comer hace que la vesícula se vacíe y que se acumulen gases en el intestino, y eso dificulta ver bien el hígado, la vesícula y los riñones. Por eso, para el ultrasonido abdominal se indica llegar en ayunas; te confirmamos las horas por teléfono.",
      "questionEn": "Why is fasting required for an abdominal ultrasound?",
      "answerEn": "Eating empties the gallbladder and builds up gas in the bowel, which makes it harder to see the liver, gallbladder and kidneys clearly. That's why you're asked to arrive fasting for an abdominal ultrasound; we confirm how many hours by phone."
    },
    {
      "question": "¿Puedo entrar acompañada al ultrasonido de embarazo?",
      "answer": "Sí, puedes entrar con tu pareja o un familiar para ver las imágenes contigo. Durante el estudio te explicamos en español lo que aparece en la pantalla, y al final te orientamos sobre tu siguiente control prenatal.",
      "questionEn": "Can someone come in with me for my pregnancy ultrasound?",
      "answerEn": "Yes, your partner or a family member can join you to see the images. During the scan we explain what's on the screen in Spanish or English, and at the end we guide you on your next prenatal checkup."
    }
  ],
  "examen-dot": [
    {
      "question": "¿Puedo hacer el examen DOT si uso lentes o aparatos para oír?",
      "answer": "Sí. Ven con los lentes, lentes de contacto o aparatos auditivos que usas al manejar, porque la visión y la audición se miden con ellos puestos. Si los necesitas para pasar la prueba, el certificado lo indicará como una condición para conducir.",
      "questionEn": "Can I take the DOT physical if I wear glasses or hearing aids?",
      "answerEn": "Yes. Bring the glasses, contacts or hearing aids you use behind the wheel, because vision and hearing are tested with them on. If you need them to pass, the certificate notes it as a condition for driving."
    },
    {
      "question": "Si la toma de presión del examen DOT da una cifra elevada, ¿pierdo el certificado?",
      "answer": "No necesariamente. Primero te dejamos descansar unos minutos y la volvemos a medir. Dependiendo de la cifra, el certificado puede emitirse con una vigencia más corta o pedirte que controles la presión y regreses; por eso conviene tomar tu medicamento como siempre antes de venir.",
      "questionEn": "What if my blood pressure is high on the day of my DOT physical?",
      "answerEn": "We first let you rest for a few minutes and measure it again. Depending on the reading, the certificate may be issued for a shorter period or you may be asked to get your pressure under control and come back, so take your medication as usual before you come in."
    },
    {
      "question": "¿Puedo traer el formulario que me dio mi compañía de transporte?",
      "answer": "Sí, tráelo junto con tu licencia y lo revisamos antes de empezar. Si tu empresa también pide una prueba de drogas para la contratación, puedes hacerte el examen de alcohol y drogas en la misma visita.",
      "questionEn": "Can I bring the paperwork my trucking company gave me?",
      "answerEn": "Yes, bring it along with your license and we'll look it over before we start. If your company also requires a drug screen for hiring, you can take the alcohol and drug test during the same visit."
    }
  ],
  "examenes-inmigracion": [
    {
      "question": "¿Qué documentos debo traer al examen médico de inmigración?",
      "answer": "Trae una identificación con foto vigente, como pasaporte o licencia, tu registro de vacunas si lo tienes y el número de caso o la carta de USCIS si ya la recibiste. Si tomas medicamentos o tienes una condición crónica, trae también esos informes.",
      "questionEn": "What documents should I bring to the immigration medical exam?",
      "answerEn": "Bring a valid photo ID such as a passport or driver's license, your vaccination record if you have one, and your USCIS case number or letter if you've received it. If you take medication or have a chronic condition, bring those records too."
    },
    {
      "question": "¿Perdí mi registro de vacunas: puedo hacer igual el examen I-693?",
      "answer": "No es un impedimento para hacer el examen. El Civil Surgeon autorizado por USCIS revisa qué vacunas exige tu caso y te aplicamos en la clínica las que falten; en algunos casos se pueden pedir análisis de sangre para comprobar si ya estás protegido.",
      "questionEn": "I lost my shot records. Can I still get the I-693 exam?",
      "answerEn": "That won't stop you from taking the exam. The USCIS-authorized Civil Surgeon reviews which vaccines your case requires, and we give you the missing ones at the clinic; in some cases a blood test can show whether you're already protected."
    },
    {
      "question": "¿Puedo abrir el sobre sellado del formulario I-693?",
      "answer": "No. El formulario I-693 se entrega en un sobre sellado y debe llegar cerrado a USCIS; si se abre o se altera, puede ser rechazado. Guárdalo tal como te lo entregamos y envíalo junto con tu solicitud o llévalo a tu entrevista, según te indiquen.",
      "questionEn": "Can I open the sealed envelope with my Form I-693?",
      "answerEn": "No. Form I-693 is handed to you in a sealed envelope and must reach USCIS unopened; if it is opened or altered, it may be rejected. Keep it exactly as we give it to you and submit it with your application or bring it to your interview, as instructed."
    }
  ],
  "vacunas": [
    {
      "question": "¿Puedo ponerme la vacuna de la gripe y el refuerzo del tétanos en la misma visita?",
      "answer": "Sí, por lo general pueden aplicarse juntas, una en cada brazo. Antes, el personal médico revisa tu registro de vacunas y te pregunta si tienes fiebre, alergias o alguna reacción previa a una vacuna.",
      "questionEn": "Can I get the flu shot and a tetanus booster in one visit?",
      "answerEn": "Yes, they can usually be given together, one in each arm. First, the medical staff reviews your vaccination record and asks about fever, allergies or any earlier reaction to a vaccine."
    },
    {
      "question": "¿Qué molestias son normales después de vacunarme?",
      "answer": "Es común que el brazo quede adolorido, rojo o un poco hinchado donde entró la aguja, y a veces aparece cansancio leve. Si notas dificultad para respirar, hinchazón de la cara o ronchas en el cuerpo, busca atención de inmediato.",
      "questionEn": "What reactions are normal after a vaccine?",
      "answerEn": "Soreness, redness or a little swelling at the injection spot is common, and some people feel slightly tired afterward. If you notice trouble breathing, facial swelling or hives on your body, seek care right away."
    },
    {
      "question": "¿Las vacunas que piden para el examen de inmigración se aplican aquí?",
      "answer": "Sí. Las vacunas que exige USCIS se pueden aplicar como parte del examen médico I-693 en la clínica. Trae tu cartilla o registro de vacunas para no repetir dosis que ya tienes.",
      "questionEn": "Are the vaccines required for the immigration exam given here?",
      "answerEn": "Yes. The vaccines USCIS requires can be given at the clinic as part of the I-693 medical exam. Bring your vaccination card or record so you do not repeat doses you already have."
    }
  ],
  "sueros-vitaminados": [
    {
      "question": "¿Qué revisan antes de aplicarme un suero vitaminado?",
      "answer": "El personal médico te pregunta por tus síntomas, enfermedades y medicamentos, y toma tus signos vitales. Con esa evaluación decide si el suero intravenoso es adecuado para ti; si no lo es, te explica otras opciones, como un análisis de sangre.",
      "questionEn": "What is checked before I receive a vitamin IV?",
      "answerEn": "The medical staff asks about your symptoms, health conditions and medications, and takes your vital signs. Based on that evaluation they decide whether the IV drip suits you; if it does not, they explain other options, such as a blood test."
    },
    {
      "question": "¿Cómo me preparo para la visita del suero?",
      "answer": "Come algo ligero antes de venir, usa una prenda de manga holgada que deje libre el brazo y trae la lista de tus medicamentos. Durante la evaluación, cuéntale al personal médico si tienes alguna enfermedad del corazón o de los riñones.",
      "questionEn": "How do I prepare for an IV drip visit?",
      "answerEn": "Eat something light before coming, wear a top with loose sleeves that leaves your arm free and bring a list of your medications. If you have heart or kidney problems, mention it during the evaluation."
    },
    {
      "question": "¿Qué hago mientras pasa el suero?",
      "answer": "Permaneces sentado y cómodo, con la vía colocada en el brazo, mientras el personal médico vigila cómo pasa el suero. Puedes leer o usar el celular; avisa enseguida si sientes ardor, mareo o hinchazón donde está la aguja.",
      "questionEn": "What do I do while the IV is running?",
      "answerEn": "You stay seated and comfortable with the line in your arm while the medical staff keeps an eye on the drip. You can read or use your phone; speak up right away if you feel burning, dizziness or swelling at the needle site."
    }
  ],
  "suturas-heridas": [
    {
      "question": "¿Qué hago con la herida mientras llego a la clínica?",
      "answer": "Aprieta el corte con un paño o una gasa limpia sin soltar, y si puedes, mantén la zona más alta que el corazón. No le pongas café, polvos ni remedios caseros; si la sangre no se detiene con la presión, llama al 911.",
      "questionEn": "What should I do with the wound on my way to the clinic?",
      "answerEn": "Press firmly on the cut with a clean cloth or gauze without letting go, and keep the area raised above your heart if you can. Skip coffee grounds, powders or home remedies; if pressure does not stop the bleeding, call 911."
    },
    {
      "question": "¿Me pueden aplicar el refuerzo del tétanos cuando me cosen?",
      "answer": "Sí. Si te cortaste con algo sucio u oxidado y no recuerdas cuándo fue tu último refuerzo, el equipo médico revisa si te toca y puede aplicarte el toxoide tetánico en la misma visita de la sutura.",
      "questionEn": "Can I get a tetanus booster when the cut is stitched?",
      "answerEn": "Yes. If the cut came from something dirty or rusty and you cannot recall your last booster, the medical team checks whether you are due and can give you the tetanus toxoid during the same visit as the stitches."
    },
    {
      "question": "¿Cuándo vuelvo para que me quiten los puntos?",
      "answer": "Depende de la parte del cuerpo: los puntos de la cara suelen retirarse antes que los de una rodilla, la espalda o el pie. Al terminar la sutura te decimos cuándo regresar, y el retiro lo hacemos en la clínica.",
      "questionEn": "When do I come back to have the stitches removed?",
      "answerEn": "It depends on the body part: stitches on the face usually come out earlier than those on a knee, the back or a foot. When we finish closing the cut we tell you when to return, and removal is done at the clinic."
    }
  ],
  "curacion-heridas": [
    {
      "question": "¿Qué conviene traer a la curación de una herida de cirugía?",
      "answer": "Trae las indicaciones que te dieron al salir de la operación y la lista de medicamentos que tomas. Ven con ropa holgada sobre la zona, para que destapar y volver a vendar la herida sea más cómodo.",
      "questionEn": "What should I bring to have a surgical wound dressed?",
      "answerEn": "Bring the discharge instructions from your surgery and a list of the medicines you take. Wear loose clothing over the area so that uncovering and re-bandaging the wound is more comfortable."
    },
    {
      "question": "¿Puedo bañarme si tengo una herida en curación?",
      "answer": "Depende del tipo de herida y del vendaje, y en cada curación te decimos si ya puedes mojarla. Lo que nunca conviene es dejar un vendaje húmedo pegado a la piel: si se moja, cámbialo o ven a que lo cambiemos.",
      "questionEn": "Can I shower while a wound is being treated?",
      "answerEn": "It depends on the wound and the dressing, and at each visit we tell you whether it can get wet yet. What you should never do is leave a damp bandage against the skin: if it gets wet, change it or come in so we can."
    },
    {
      "question": "¿Por qué tarda más en sanar una herida si tengo diabetes?",
      "answer": "El azúcar alta en sangre y la mala circulación hacen que las heridas, sobre todo en los pies, cierren más despacio y se infecten con más facilidad. Por eso conviene revisarlas con más frecuencia y mantener la glucosa bajo control.",
      "questionEn": "Why does a wound heal more slowly if I have diabetes?",
      "answerEn": "High blood sugar and poor circulation make wounds, especially on the feet, close more slowly and get infected more easily. That is why they need more frequent checks, along with keeping your glucose under control."
    }
  ],
  "cirugias-menores": [
    {
      "question": "¿Tengo que venir en ayunas para quitarme un lunar o un quiste?",
      "answer": "No, con anestesia local puedes comer con normalidad antes del procedimiento. Lo importante es avisarnos si tomas anticoagulantes o aspirina, o si alguna vez reaccionaste mal a un anestésico, para planearlo con seguridad.",
      "questionEn": "Do I need to fast before having a mole or cyst removed?",
      "answerEn": "No, with local anesthesia you can eat normally beforehand. What matters is telling us if you take blood thinners or aspirin, or if you ever reacted badly to an anesthetic, so the procedure can be planned safely."
    },
    {
      "question": "¿Puedo manejar de regreso a casa después de la cirugía menor?",
      "answer": "En la mayoría de los casos sí, porque la anestesia local solo adormece la zona tratada y no te duerme. Si la lesión está en la mano derecha o en un pie, puede ser más cómodo venir acompañado.",
      "questionEn": "Can I drive home after minor surgery?",
      "answerEn": "In most cases yes, because local anesthesia only numbs the treated spot and does not put you to sleep. If the growth is on your right hand or a foot, coming with someone may be more comfortable."
    },
    {
      "question": "¿Me quedará cicatriz después de quitar un lipoma o un lunar?",
      "answer": "Todo corte en la piel deja alguna marca, pero el equipo médico procura que sea pequeña y, cuando se puede, la orienta siguiendo los pliegues naturales. Seguir los cuidados que te damos y no exponer la zona al sol mientras madura la cicatriz la hace menos visible.",
      "questionEn": "Will I have a scar after a lipoma or mole is removed?",
      "answerEn": "Any cut in the skin leaves some mark, but the medical team aims to keep it small and, when possible, lines it up with the natural creases. Caring for the wound as instructed and shielding it from the sun helps it fade."
    }
  ],
  "drenaje-abscesos": [
    {
      "question": "¿Siempre hace falta antibiótico después de drenar un absceso?",
      "answer": "No siempre. En muchos abscesos pequeños basta con vaciar y limpiar bien; el equipo médico añade antibiótico si hay fiebre, la piel de alrededor está muy roja o tienes condiciones como diabetes, y te lo entregamos en la farmacia de la clínica.",
      "questionEn": "Is an antibiotic always needed after an abscess is drained?",
      "answerEn": "Not always. For many small abscesses, emptying and cleaning them well is enough; the medical team adds an antibiotic if there is fever, the surrounding skin is very red or you have a condition like diabetes, and we hand it to you at the clinic pharmacy."
    },
    {
      "question": "¿Qué puede hacer que los abscesos se repitan?",
      "answer": "Los abscesos repetidos pueden tener que ver con bacterias que viven en la piel, el roce de la ropa, vellos encarnados o el azúcar alta en sangre. Si te pasa con frecuencia, te proponemos revisar la glucosa con un examen de sangre.",
      "questionEn": "Why do I keep getting abscesses?",
      "answerEn": "Recurring abscesses can be linked to bacteria living on the skin, friction from clothing, ingrown hairs or high blood sugar. If it happens often, we suggest checking your glucose with a blood test."
    },
    {
      "question": "¿Cómo cuido la herida que queda tras el drenaje?",
      "answer": "Mantén la gasa limpia, cámbiala si se moja o se empapa y lávate las manos antes y después. Es normal que salga algo de líquido los primeros días; si aumentan el dolor o el enrojecimiento, o aparece fiebre, regresa a revisión.",
      "questionEn": "How do I care for the wound left after drainage?",
      "answerEn": "Keep the gauze clean, change it if it gets wet or soaked through, and wash your hands before and after. Some fluid during the first days is normal; if pain or redness increases, or a fever starts, come back for a check."
    }
  ],
  "unas-encarnadas": [
    {
      "question": "¿Puedo caminar después de que me quiten la uña encarnada?",
      "answer": "Sí, sales caminando. Conviene traer una sandalia o un zapato holgado para no apretar el vendaje del dedo. Cuando pasa el efecto de la anestesia local puede doler un poco, y te explicamos cómo aliviarlo en casa.",
      "questionEn": "Can I walk after the ingrown toenail is removed?",
      "answerEn": "Yes, you walk out on your own. Bring a sandal or a roomy shoe so the toe bandage is not squeezed. Once the local anesthetic wears off it may ache a little, and we explain how to ease it at home."
    },
    {
      "question": "¿Cómo evito que la uña se vuelva a encarnar?",
      "answer": "Corta las uñas de los pies en línea recta, sin redondear las esquinas ni dejarlas demasiado cortas, y evita el calzado que aprieta la punta. Si el dedo vuelve a enrojecer o doler, ven antes de que se infecte.",
      "questionEn": "How do I keep the nail from growing in again?",
      "answerEn": "Trim your toenails straight across, without rounding the corners or cutting them too short, and avoid shoes that pinch the toe box. If the toe turns red or sore again, come in before it gets infected."
    },
    {
      "question": "¿Qué precauciones hay con una uña encarnada si tengo diabetes?",
      "answer": "Con diabetes, una uña encarnada se infecta con más facilidad y sana más lento, así que no intentes cortarla tú ni sacarla con objetos caseros. Ven en cuanto notes dolor o enrojecimiento, y te damos indicaciones de cuidado del pie.",
      "questionEn": "What precautions apply to an ingrown toenail if I have diabetes?",
      "answerEn": "With diabetes, an ingrown toenail gets infected more easily and heals more slowly, so do not try to cut it out or dig at it yourself. Come in as soon as you notice pain or redness, and we give you foot-care instructions."
    }
  ],
  "farmacia": [
    {
      "question": "¿Cómo sé cuánto cuestan los medicamentos que me indicaron?",
      "answer": "El costo depende del medicamento indicado y de si existe una versión genérica. Antes de entregártelo te decimos el precio, y puedes pagar en efectivo, con tarjeta de débito o crédito, o con el celular.",
      "questionEn": "How do I find out what my prescribed medications cost?",
      "answerEn": "The cost depends on the medication prescribed and whether a generic version exists. We tell you the price before handing it over, and you can pay with cash, a debit or credit card, or your phone."
    },
    {
      "question": "¿Puedo comprar algo de venta libre sin pasar a consulta?",
      "answer": "Sí. Analgésicos, antigripales o antialérgicos de venta libre se compran directamente en el mostrador, y el personal te orienta sobre cuál se ajusta a lo que buscas. Los medicamentos que requieren indicación se entregan solo después de una evaluación.",
      "questionEn": "Can I buy an over-the-counter product without a visit?",
      "answerEn": "Yes. Over-the-counter pain relievers, cold medicines and antihistamines are sold right at the counter, and the staff can help you pick the right one. Medications that require a prescription are handed out only after an evaluation."
    },
    {
      "question": "¿Me explican cómo tomar el medicamento que me entregan?",
      "answer": "Sí. Al dártelo te decimos en español la dosis, a qué hora tomarlo, si va con comida y qué hacer si olvidas una toma. Menciona cualquier otro medicamento o suplemento que tomes para revisar que no se crucen.",
      "questionEn": "Will someone explain how to take the medicine I receive?",
      "answerEn": "Yes. When we hand it over, we go through the dose, what time to take it, whether to take it with food and what to do if you miss one. Mention any other medicine or supplement you use so we can check they do not interact."
    }
  ]
};

export function getServiceFaqs(slug: string): ServiceFaq[] {
  return SERVICE_FAQS[slug] ?? [];
}
