"use client";

import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

export function FaqsClient() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");
  const [activeCategory, setActiveCategory] = useState(0);

  const faqCategories = [
    {
      category: "Requisitos y condiciones del alquiler",
      faqs: [
        {
          question: "¿Qué tipo de permiso de conducir necesito para conducir una camper?",
          answer: "Para conducir cualquiera de las campers de Eco Area Limonar se necesita el permiso de conducción tipo B con al menos dos años de antigüedad. No se requiere ningún carnet especial porque los vehículos tienen una masa máxima autorizada inferior a 3.500 kg."
        },
        {
          question: "¿Puedo alquilar una camper para un fin de semana?",
          answer: "Sí. En temporada baja Eco Area Limonar realiza alquileres de fin de semana (la duración mínima son dos días). El precio mínimo a facturar es el equivalente a tres días, de modo que suele resultar más rentable ampliar la escapada hasta esa duración."
        },
        {
          question: "¿Cuál es la forma más rápida de reservar mi autocaravana?",
          answer: "La forma más rápida es reservar directamente en la web. Basta con seleccionar las fechas deseadas, elegir el modelo de camper y abonar online el 50% del alquiler; una vez pagada esa señal el vehículo queda bloqueado."
        },
        {
          question: "¿Qué accesorios están incluidos sin coste adicional?",
          answer: "El alquiler incluye kilometraje ilimitado, conductores adicionales, utensilios de cocina (sartén, cazo, cafetera italiana, tabla de cortar, cuchillo y vajilla de cuatro servicios) y un kit de camping con mesa y dos sillas plegables. También se suministran calzas niveladoras, una manguera para cargar agua y el cable de corriente con adaptadores. El gas propano o butano para la cocina y calefacción y las pastillas para el WC químico también están incluidas."
        },
        {
          question: "¿Cuál es la fianza y cómo se paga?",
          answer: "La fianza es de 1.000€ y se abona por transferencia bancaria, que debe haberse recibido 72 horas antes del inicio del alquiler. Se devuelve en un plazo de 10 días laborables tras la devolución del vehículo, tras inspección y valoración de posibles daños."
        }
      ]
    },
    {
      category: "Equipamiento y funcionamiento de la vivienda",
      faqs: [
        {
          question: "¿Tienen aire acondicionado en la zona de vivienda?",
          answer: "Ninguno de los modelos de Eco Area Limonar cuenta con aire acondicionado en el habitáculo trasero. Únicamente disponen del aire acondicionado de la cabina del conductor, que funciona cuando el motor está en marcha. No se debe dejar el motor encendido para refrigerar la zona de vivienda ya que podría provocar una avería en el motor."
        },
        {
          question: "¿Cómo se cargan las baterías de la camper?",
          answer: "Las campers incorporan una batería del vehículo (para el motor) y una o varias baterías de la vivienda. Las baterías de vivienda se cargan al conducir gracias al alternador, al conectarse a 220V en un camping o área de servicio y mediante las placas solares instaladas en el techo. Para mantener la autonomía es recomendable aprovechar los periodos de marcha o conexión a red para cargar los dispositivos y reducir el consumo cuando se está parado."
        },
        {
          question: "¿Cómo funciona el panel de control?",
          answer: "Todas las campers disponen de un panel que permite encender la bomba de agua y la electricidad del habitáculo, consultar el nivel de carga de las baterías, el nivel de agua limpia y un aviso luminoso cuando las aguas grises superan el 75%. Algunos modelos también permiten activar la iluminación exterior o sistemas de calefacción adicionales."
        },
        {
          question: "¿Tienen calefacción en la vivienda?",
          answer: "Sí. Según el modelo, las campers pueden llevar una Truma Combi a gas o una Truma Combi/Webasto a diésel. Ambos sistemas proporcionan calefacción del habitáculo y agua caliente. Para calentar el agua se necesitan entre 10 y 20 minutos según el modo elegido. La calefacción no debe utilizarse mientras se conduce."
        },
        {
          question: "¿Hay enchufes de 220V en la camper?",
          answer: "Los enchufes de 220V sólo funcionan cuando la camper está conectada a la red eléctrica externa en campings o áreas de autocaravanas. Las campers de Eco Area Limonar no incorporan inversor porque el uso de aparatos de alto consumo agotaría rápidamente las baterías de vivienda."
        }
      ]
    },
    {
      category: "Agua y climatización",
      faqs: [
        {
          question: "¿Dónde se llena el depósito de aguas limpias?",
          answer: "El depósito de aguas limpias (70-90 litros según el modelo) se encuentra en el lateral posterior del vehículo y se llena desde una boca de carga exterior que se abre con una llave distinta a la del vehículo. Es esencial utilizar una manguera de agua potable y asegurarse de no introducir combustibles o sustancias distintas al agua."
        },
        {
          question: "¿Dónde se vacían las aguas grises y negras?",
          answer: "Las aguas grises (procedentes del fregadero y ducha) se vacían mediante una llave de apertura situada en un lateral del vehículo. Solo deben verterse en áreas de autocaravanas, campings o puntos de vaciado autorizados. Las aguas negras (del WC químico) se vacían retirando el cassette exterior y vaciándolo en un punto específico para aguas negras."
        },
        {
          question: "¿Qué tipo de gas debo usar en invierno?",
          answer: "En invierno se recomienda utilizar propano, porque mantiene la presión y se evapora correctamente incluso a temperaturas bajo cero. El butano es más económico y funciona bien en climas templados, pero por debajo de 0°C deja de vaporizarse y puede cortar el suministro de gas."
        },
        {
          question: "¿Qué diferencia hay entre aguas limpias, grises y negras?",
          answer: "El depósito de aguas limpias almacena agua potable para la cocina, lavabo y ducha. Las aguas grises son las residuales de fregadero y ducha y se acumulan en un depósito separado que debe vaciarse en puntos autorizados. Las aguas negras son los residuos del WC químico; se recogen en un cassette extraíble que se vacía en zonas específicas para aguas negras."
        }
      ]
    },
    {
      category: "Cocina y electrodomésticos",
      faqs: [
        {
          question: "¿Qué incluye el menaje de cocina?",
          answer: "El menaje incluye vajilla y cubertería para cuatro personas, ollas y sartenes, cafetera italiana, tabla de corte y utensilios básicos (cucharón, espátula, cuchillo de cocina)."
        },
        {
          question: "¿Tienen horno o microondas?",
          answer: "No. Las campers disponen de una cocina de gas de dos fuegos, fregadero y nevera. Para utilizar un microondas, cafetera eléctrica o tostadora es necesario estar conectados a la red de 220V en un camping o área con toma eléctrica."
        },
        {
          question: "¿Cómo se encienden los fuegos de la cocina de gas?",
          answer: "Para encender la cocina hay que abrir la válvula de la bombona de gas, girar el mando correspondiente del quemador, presionar para activar la chispa (si el modelo la incorpora) o acercar un mechero, mantener pulsado unos segundos hasta que la llama se estabilice y regular la intensidad deseada. Se aconseja ventilar el habitáculo mientras se utiliza la cocina."
        },
        {
          question: "¿Cómo usar la nevera de la camper?",
          answer: "Existen dos tipos de neveras: de compresor a 12V, que funcionan sólo con la batería de vivienda y son muy eficientes, y trivalentes (12V / 220V / gas). Las neveras trivalentes se alimentan a 220V cuando la camper está enchufada, utilizan el modo marcha mientras se conduce (12V) y pueden funcionar a gas cuando está estacionada. Es recomendable ajustar la temperatura a media potencia y evitar abrir la nevera constantemente para ahorrar energía."
        }
      ]
    },
    {
      category: "Seguridad, aparcamiento y descanso",
      faqs: [
        {
          question: "¿Dónde es seguro dormir con la camper?",
          answer: "La opción más segura son los campings y las áreas de autocaravanas oficiales, que suelen contar con servicios básicos y, en muchos casos, vigilancia. También es seguro pernoctar en pueblos pequeños en calles tranquilas y bien iluminadas, aparcamientos de supermercados o estaciones de servicio con vigilancia (preguntando previamente) y aparcamientos de estaciones o puertos con control de acceso."
        },
        {
          question: "¿Está permitido dormir en la camper fuera de un camping?",
          answer: "Sí. La normativa española permite pernoctar en el interior del vehículo siempre que esté correctamente estacionado y no se considere acampada. Eso implica tener únicamente las ruedas en contacto con el suelo, no desplegar toldos ni mobiliario exterior y no verter ningún tipo de líquido fuera del vehículo."
        },
        {
          question: "¿Cuál es la diferencia entre aparcar y acampar?",
          answer: "Aparcar es estacionar la camper ocupando sólo el espacio delimitado para un vehículo, con las ruedas en el suelo y sin sacar elementos exteriores. Acampar supone desplegar toldos, mesas, sillas, patas niveladoras o verter líquidos; esta actividad queda restringida a campings o áreas expresamente habilitadas. La pernocta dentro del vehículo no se considera acampada siempre que se esté aparcado correctamente."
        },
        {
          question: "¿Cómo puedo incrementar la seguridad durante el viaje?",
          answer: "Evita dejar objetos de valor a la vista, cierra todas las puertas y ventanas cuando abandones la camper, usa cortinas opacas por la noche y estaciona en lugares iluminados. Antes de dormir revisa que las ventanas estén cerradas y aparca de manera que puedas salir fácilmente si surge alguna situación extraña. Lleva siempre chalecos reflectantes, triángulos, un botiquín y comprueba la presión de los neumáticos."
        }
      ]
    },
    {
      category: "Reservas, pagos y cancelaciones",
      faqs: [
        {
          question: "¿Cómo funciona el pago y la reserva?",
          answer: "Reserva inicial: se abona el 50% del precio total mediante tarjeta en la web. Segundo pago: debe completarse también con tarjeta como máximo 15 días antes del inicio del alquiler. Si la reserva se hace con menos de 15 días de antelación, el segundo pago debe efectuarse en un plazo de 2 días."
        },
        {
          question: "¿Qué descuentos existen por duración?",
          answer: "-10% si el alquiler supera 6 días. -20% si supera 13 días. -30% si supera 20 días (aplica en temporada baja; en temporadas media y alta se reducen)."
        },
        {
          question: "¿Cómo funciona el derecho de desistimiento?",
          answer: "Se dispone de 14 días naturales desde la emisión del contrato para desistir sin penalización. Si entre la reserva y el inicio quedan menos de 14 días, el derecho expira 7 días antes del comienzo del viaje. Se devuelve el importe total pagado en un máximo de 14 días tras la notificación de desistimiento."
        },
        {
          question: "¿Qué ocurre si cancelo fuera del periodo de desistimiento?",
          answer: "Hasta 60 días antes del inicio: cancelación gratuita. Entre 59 y 16 días antes: penalización del 10% del precio total. Se puede contratar un seguro de cancelación (5€/día) que cubre esta penalización. Entre 15 y 8 días antes: penalización del 50%. Menos de 7 días: penalización del 75%."
        }
      ]
    },
    {
      category: "Viajes internacionales",
      faqs: [
        {
          question: "¿Puedo salir de España con la camper?",
          answer: "Sí, sin problema. Las campers de Eco Area Limonar cuentan todas con seguro con carta verde que permite viajar (e incluye asistencia en carretera) a la mayoría de países de nuestro entorno: la UE, y también Marruecos."
        },
        {
          question: "¿Puedo viajar a Marruecos con una camper de Eco Area Limonar?",
          answer: "Sí. Marruecos es uno de los países que se incluyen dentro de la Carta Verde del seguro, por lo que hay cobertura y se puede viajar."
        }
      ]
    },
    {
      category: "Modelos de campers",
      faqs: [
        {
          question: "¿Qué tienen en común todas las campers de Eco Area Limonar?",
          answer: "Todas las campers de Eco Area Limonar son vehículos de gran volumen basados en furgonetas Fiat Ducato, Peugeot Boxer o Citroën Jumper de los años 2023-2025. Se configuran en tamaño H2 L3 (techo alto y 6m de longitud). Incorporan cámara de marcha atrás, batería de litio, placa solar, toldo exterior y radio multimedia. La flota se renueva cada dos años."
        },
        {
          question: "¿Cuántas personas pueden viajar y dormir?",
          answer: "Todas las campers tienen 4 plazas homologadas para viajar de día, pero el número de plazas de noche varía: 2 plazas de noche en modelos con una sola cama. 4 plazas de noche en modelos con literas o cama adicional, con un extra de 10€/día para habilitar la segunda cama."
        },
        {
          question: "¿Qué altura tienen las campers? ¿Cuáles son las dimensiones?",
          answer: "La mayoría de las campers de Eco Area Limonar son H2L3: 230 cm de alto (260 con claraboya y toldo) y 599 cm de largo. También disponemos de algunos modelos H3L3 que son más altos, unos 30 cm, y esto les permite tener una segunda cama en el techo, parte superior, del salón."
        }
      ]
    },
    {
      category: "Incidencias y mantenimiento",
      faqs: [
        {
          question: "¿Qué hago si tengo una avería durante el viaje?",
          answer: "Contamos con asistencia en carretera 24/7 en toda Europa. Además, dispones de nuestro teléfono de soporte técnico WhatsApp +34 608 307 381 y el chat de IA para resolver dudas menores o guiarte en caso de incidencia."
        },
        {
          question: "¿Qué significan los errores E507H y W412H en la calefacción Truma?",
          answer: "El error E507H indica un fallo en el suministro de gas; suele deberse a que la bombona está vacía o a que se ha olvidado abrir la válvula. El error W412H aparece cuando la calefacción detecta que la ventana del salón está abierta; hay que cerrarla para que el sistema funcione de nuevo."
        },
        {
          question: "¿Cómo debo devolver la camper?",
          answer: "La camper se entrega con el interior limpio y sin residuos personales, las aguas grises y negras vaciadas, el depósito de combustible al mismo nivel que al recogerla y sin daños. La limpieza exterior no es necesaria. La revisión de la furgoneta se realiza sin el cliente presente y la fianza se devuelve en un plazo aproximado de 5-10 días."
        }
      ]
    },
    {
      category: "Recursos útiles",
      faqs: [
        {
          question: "¿Dónde está ubicado Eco Area Limonar?",
          answer: "Eco Area Limonar está en Los Nietos, Cartagena, en las proximidades del Mar Menor (Murcia). Es un área de autocaravanas con parcelas equipadas para tu estancia."
        },
        {
          question: "¿Puedo visitar el área antes de reservar?",
          answer: "Sí, puedes contactarnos para visitar el área o solicitar información. Estamos en Los Nietos, Cartagena. La atención se realiza por teléfono, WhatsApp o correo electrónico."
        },
        {
          question: "¿Qué servicios tiene el área?",
          answer: "Eco Area Limonar ofrece parcelas equipadas para autocaravanas y campers. Contacta con nosotros para conocer los servicios disponibles: electricidad, vaciado de aguas, etc."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={t("Preguntas Frecuentes")}
        subtitle={t("Resolvemos todas tus dudas sobre tu estancia")}
        tag="FAQ"
        backgroundImage="/images/slides/AdobeStock_43931257.webp"
      />

      {/* Category nav — grid de botones */}
      <section className="py-10 lg:py-14 bg-sand-lt">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {faqCategories.map((category, index) => (
              <a
                key={index}
                href={`#category-${index}`}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center justify-center text-center px-4 py-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeCategory === index
                    ? "bg-earth text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-earth hover:text-earth hover:shadow-md"
                }`}
              >
                {t(category.category)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-14">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} id={`category-${categoryIndex}`} className="scroll-mt-24">
                <h2 className="text-2xl lg:text-3xl font-heading font-extrabold text-earth mb-8">
                  {t(category.category)}
                </h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    return (
                      <div 
                        key={globalIndex}
                        className="bg-sand-lt rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
                      >
                        <button
                          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                          onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                        >
                          <span className="font-heading font-bold text-gray-900">{t(faq.question)}</span>
                          <ChevronDown className={`h-5 w-5 text-earth flex-shrink-0 transition-transform duration-300 ${openIndex === globalIndex ? "rotate-180" : ""}`} />
                        </button>
                        {openIndex === globalIndex && (
                          <div className="px-6 pb-5 text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                            {t(faq.answer)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with photo overlay */}
      <section className="relative h-[280px] lg:h-[320px] overflow-hidden">
        <Image
          src="/images/slides/limonar_area_camper_mar_menor_2.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-earth-deep/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl lg:text-3xl font-heading font-extrabold mb-3">
            {t("¿No encuentras tu respuesta?")}
          </h2>
          <p className="text-white/60 text-sm mb-6">{t("Contacta con nosotros y te ayudaremos encantados")}</p>
          <a 
            href="/contacto" 
            className="bg-clay text-white font-extrabold py-3.5 px-8 rounded-full hover:bg-clay-dk transition-all"
          >
            {t("Contactar")}
          </a>
        </div>
      </section>
    </main>
  );
}
