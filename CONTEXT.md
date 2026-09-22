# Contexto de dominio — sitio personal de Raul Vidal

Glosario del dominio de contenido para el sitio CV/portfolio. Sin detalles de
implementación — solo términos, entidades y relaciones.

## Entidades

### Profile
Los datos identitarios y de contacto de Raul: nombre completo, ubicación,
modalidad de trabajo (remoto), email, teléfono, links (LinkedIn, GitHub),
idiomas hablados. Existe una sola instancia. Es un **Fact** (ver más abajo),
no lleva narrativa.

### Experience
Un puesto de trabajo cronológico: empresa, rol, rango de fechas, modalidad,
stack usado en ese puesto, descripción compacta. Cuatro instancias conocidas
(Relink, Continuum HQ, Aynitech Group, Prodequa/Freelance).

### ImpactCase
Una historia narrativa en formato **problema → decisión → resultado**.
Cada `ImpactCase` **referencia un `Experience` por id** (`experienceId`) —
nunca repite el nombre de empresa o fechas como texto libre, los deriva del
`Experience` referenciado. Esto garantiza que un caso de impacto nunca
mencione una empresa que no exista en la lista de `Experience`, y que un
cambio de nombre/fecha de empresa se propague desde un solo lugar.

Llevan un orden explícito de prioridad (el caso "supervisor en Relink" va
primero por ser el más fuerte y cuantificable).

### TechStackItem
Una tecnología o herramienta del stack técnico. Cada item lleva un campo
**`category`** estructurado (enum), no agrupamiento manual:
- `core` — uso diario, dominio senior.
- `infrastructure` — uso productivo real (bases de datos, orquestación).
- `cloud` — proveedores y servicios cloud.
- `as-needed` — usado según necesidad del problema, explícitamente no
  presentado como especialidad.

La categoría determina cómo se agrupa y presenta visualmente, sin jerarquía
senior/junior explícita en el texto.

### Education
Una entrada de formación académica: institución, título/programa, rango de
fechas.

### Certification
Una certificación obtenida: nombre, entidad emisora, fecha.

## Distinción: Fact vs Localized content

Todo el contenido vive **duplicado por locale** (un árbol de contenido
completo para `en` y otro para `es` — sin split estructural entre campos
traducibles y campos fijos). Aun así, conceptualmente:

- **Fact**: un valor que no cambia de significado entre idiomas (nombres
  propios de empresa, fechas, stack de tecnologías, email, teléfono,
  links). Se traduce solo si el formato local lo requiere (ej. formato de
  fecha), nunca su contenido.
- **Localized content**: texto narrativo que sí requiere traducción real
  (el posicionamiento del hero, la narrativa problema/decisión/resultado de
  cada `ImpactCase`, descripciones de `Experience`).

Esta distinción es conceptual para guiar la escritura del contenido; el
almacenamiento no la separa estructuralmente (ver decisión de duplicación
completa por locale arriba).

## Líneas rojas de veracidad

Restricciones editoriales sobre qué **no** afirmar en `ImpactCase` o
`Experience` (ej. no decir que hubo migración Vue 2 → Vue 3, no decir que
Relink era multi-tenant, no usar cifras no confirmadas). Estas restricciones
son **guía editorial pura** — no se modelan como campo en el schema. Viven
documentadas en el brief fuente
(`ai-job-search/documents/personal-site-cv-brief.md`) y se aplican una sola
vez al escribir el contenido, dado que es contenido estático de autor único,
no un CMS colaborativo.

## Fuera de alcance

- `BlogPost` / `Project` como entidades de contenido — el sitio es solo
  CV/perfil por ahora, sin blog ni casos de estudio de proyectos personales.
- Cualquier entidad de identidad visual/diseño — se resuelve aparte, no es
  parte de este dominio de contenido.
