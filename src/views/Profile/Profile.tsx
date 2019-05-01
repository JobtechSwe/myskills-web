import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Flex from '../../components/Flex'
import PdfLink from './PdfLink'
import AddedEducations from '../../components/AddedEducations'
import ChosenOccupations from '../../components/ChosenOccupations'
import { Text, StyleSheet } from '@react-pdf/renderer'

const Profile: React.FC<RouteComponentProps> = props => (
  <Flex alignItems="center" flexDirection="column" justifyContent="center">
    <CV />
    <AddedEducations />
    <ChosenOccupations />
    <PdfLink CV={CV} />
  </Flex>
)

const CV = () => (
  <>
    <Text style={styles.title}>Mitt CV</Text>
    <Text style={styles.author}>Kendrick Lamar</Text>
    <Text style={styles.subtitle}>
      Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
      Quijote de la Mancha
    </Text>
    <Text style={styles.text}>
      Mauris venenatis tellus a leo varius, eu convallis lacus vehicula. Sed sit
      amet fermentum enim, ut luctus justo. In id mi metus. Pellentesque id
      facilisis elit. Nullam tempor nibh ut maximus venenatis. Nullam at tempus
      sem, id accumsan felis. Sed varius pharetra bibendum. Sed convallis velit
      metus, et imperdiet purus vulputate porttitor. Duis mattis porta risus, at
      pharetra mi mattis ut
    </Text>
    <Text style={styles.text}>
      Nam gravida consequat lectus, et ullamcorper neque consectetur vel. Sed
      tincidunt est in lectus fringilla, a porta felis aliquam. Donec ipsum
      enim, malesuada vitae vulputate non, sagittis in turpis. Nullam quis lorem
      orci. Aliquam erat volutpat. Pellentesque id iaculis mi, eget imperdiet
      justo. Phasellus ac imperdiet elit, a laoreet neque. Nullam sit amet
      bibendum erat. Praesent sit amet risus molestie, dapibus justo a, laoreet
      odio. Nulla accumsan placerat augue id dapibus. Quisque quis sollicitudin
      ipsum. Fusce eget neque eget lacus gravida commodo nec eu lorem. Aenean
      auctor hendrerit blandit. Suspendisse a pulvinar leo.
    </Text>
    <Text style={styles.text}>
      Mauris venenatis tellus a leo varius, eu convallis lacus vehicula. Sed sit
      amet fermentum enim, ut luctus justo. In id mi metus. Pellentesque id
      facilisis elit. Nullam tempor nibh ut maximus venenatis. Nullam at tempus
      sem, id accumsan felis. Sed varius pharetra bibendum. Sed convallis velit
      metus, et imperdiet purus vulputate porttitor. Duis mattis porta risus, at
      pharetra mi mattis ut. Nunc ullamcorper nisl turpis, quis placerat est
      laoreet volutpat. Suspendisse potenti. Praesent vel tincidunt lectus.
      Phasellus non nunc facilisis mi semper ultrices eleifend vitae risus.
    </Text>
    <Text style={styles.text}>
      En resolución, él se enfrascó tanto en su lectura, que se le pasaban las
      noches leyendo de claro en claro, y los días de turbio en turbio, y así,
      del poco dormir y del mucho leer, se le secó el cerebro, de manera que
      vino a perder el juicio. Llenósele la fantasía de todo aquello que leía en
      los libros, así de encantamientos, como de pendencias, batallas, desafíos,
      heridas, requiebros, amores, tormentas y disparates imposibles, y
      asentósele de tal modo en la imaginación que era verdad toda aquella
      máquina de aquellas soñadas invenciones que leía, que para él no había
      otra historia más cierta en el mundo.
    </Text>
    <Text break style={styles.subtitle}>
      Capítulo II: Que trata de la primera salida que de su tierra hizo el
      ingenioso Don Quijote
    </Text>
    <Text style={styles.text}>
      Hechas, pues, estas prevenciones, no quiso aguardar más tiempo a poner en
      efeto su pensamiento, apretándole a ello la falta que él pensaba que hacía
      en el mundo su tardanza, según eran los agravios que pensaba deshacer,
      tuertos que enderezar, sinrazones que emendar y abusos que mejorar y
      deudas que satisfacer. Y así, sin dar parte a persona alguna de su
      intención y sin que nadie le viese, una mañana, antes del día, que era uno
      de los calurosos del mes de Julio, se armó de todas sus armas, subió sobre
      Rocinante, puesta su mal compuesta celada, embrazó su adarga, tomó su
      lanza y por la puerta falsa de un corral salió al campo con grandísimo
      contento y alborozo de ver con cuánta facilidad había dado principio a su
      buen deseo. Mas apenas se vio en el campo cuando le asaltó un pensamiento
      terrible, y tal, que por poco le hiciera dejar la comenzada empresa; y fue
      que le vino a la memoria que no era armado caballero, y que, conforme a
      ley de caballería, ni podía ni debía tomar armas con ningún caballero; y
      puesto que lo fuera, había de llevar armas blancas, como novel caballero,
      sin empresa en el escudo, hasta que por su esfuerzo la ganase. Estos
      pensamientos le hicieron titubear en su propósito; mas pudiendo más su
      locura que otra razón alguna, propuso de hacerse armar caballero del
      primero que topase, a imitación de otros muchos que así lo hicieron, según
      él había leído en los libros que tal le tenían. En lo de las armas
      blancas, pensaba limpiarlas de manera, en teniendo lugar, que lo fuesen
      más que un arminio; y con esto se quietó18 y prosiguió su camino, sin
      llevar otro que aquel que su caballo quería, creyendo que en aquello
      consistía la fuerza de las aventuras
    </Text>
    <Text style={styles.text}>
      Yendo, pues, caminando nuestro flamante aventurero, iba hablando consigo
      mesmo, y diciendo: —¿Quién duda, sino que en los venideros tiempos, cuando
      salga a luz la verdadera historia de mis famosos hechos, que el sabio que
      los escribiere no ponga, cuando llegue a contar esta mi primera salida tan
      de mañana, desta manera?: Apenas había el rubicundo Apolo tendido por la
      faz de la ancha y espaciosa tierra las doradas hebras de sus hermosos
      cabellos, y apenas los pequeños y pintados pajarillos con sus arpadas
      lenguas habían saludado con dulce y meliflua armonía la venida de la
      rosada Aurora, que, dejando la blanda cama del celoso marido, por las
      puertas y balcones del manchego horizonte a los mortales se mostraba,
      cuando el famoso caballero don Quijote de la Mancha, dejando las ociosas
      plumas, subió sobre su famoso caballo Rocinante y comenzó a caminar por el
      antiguo y conocido Campo de Montiel.
    </Text>
    <Text style={styles.text}>
      Y era la verdad que por él caminaba; y añadió diciendo: —Dichosa edad y
      siglo dichoso aquel adonde saldrán a luz las famosas hazañas mías, dignas
      de entallarse en bronces, esculpirse en mármoles y pintarse en tablas,
      para memoria en lo futuro. ¡Oh tú, sabio encantador, quienquiera que seas,
      a quien ha de tocar el ser coronista desta peregrina historia! Ruégote que
      no te olvides de mi buen Rocinante, compañero eterno mío en todos mis
      caminos y carreras.
    </Text>
    <Text style={styles.text}>
      Luego volvía diciendo, como si verdaderamente fuera enamorado: —¡Oh
      princesa Dulcinea, señora deste cautivo corazón! Mucho agravio me habedes
      fecho en despedirme y reprocharme con el riguroso afincamiento de mandarme
      no parecer ante la vuestra fermosura. Plégaos, señora, de membraros deste
      vuestro sujeto corazón, que tantas cuitas por vuestro amor padece. Con
      estos iba ensartando otros disparates, todos al modo de los que sus libros
      le habían enseñado, imitando en cuanto podía su lenguaje. Con esto
      caminaba tan despacio, y el sol entraba tan apriesa y con tanto ardor, que
      fuera bastante a derretirle los sesos, si algunos tuviera
    </Text>
    <Text style={styles.text}>
      Casi todo aquel día caminó sin acontecerle cosa que de contar fuese, de lo
      cual se desesperaba, porque quisiera topar luego luego con quien hacer
      experiencia del valor de su fuerte brazo. Autores hay que dicen que la
      primera aventura que le avino fue la del Puerto Lápice, otros dicen que la
      de los molinos de viento; pero lo que yo he podido averiguar en este caso,
      y lo que he hallado escrito en los anales de la Mancha, es que él anduvo
      todo aquel día, y, al anochecer, su rocín y él se hallaron cansados y
      muertos de hambre, y que, mirando a todas partes por ver si descubriría
      algún castillo o alguna majada de pastores donde recogerse y adonde
      pudiese remediar su mucha hambre y necesidad, vio, no lejos del camino por
      donde iba, una venta,que fue como si viera una estrella que, no a los
      portales, sino a los alcázares de su redención le encaminaba. Diose priesa
      a caminar, y llegó a ella a tiempo que anochecía.
    </Text>
  </>
)

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default Profile
