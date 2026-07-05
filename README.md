# JS30 Widgets

Репозиторий для сдачи JS30-виджетов студентами RS School.

## Как работать с репозиторием

1. Склонируйте репозиторий:

   ```bash
   git clone <repository-url>
   cd js30-widgets
   ```

2. Создайте новую ветку для своей работы:

   ```bash
   git checkout -b github-login-widgets
   ```

   Замените `github-login` на имя своего GitHub-аккаунта.

3. В папке `students` создайте папку с названием вашего GitHub-аккаунта:

   ```text
   students/
     github-login/
   ```

4. Внутри своей папки создайте отдельные папки для виджетов и файл README.md . Все файлы каждого виджета храните внутри его папки.

   Пример:

   ```text
   students/
     github-login/
       README.md 
       drum-kit/
         index.html
         style.css
         script.js
       js-clock/
         index.html
         style.css
         script.js
   ```

5. Ведите разработку виджетов внутри этих папок.

6. В корневом файле `index.html` добавьте свою карточку по аналогии с уже существующими карточками.

   Пример:

   ```html
   <article class="student-card">
     <h3 class="student-name">@github-login</h3>
     <div class="widget-links" aria-label="@github-login widget links">
       <a class="widget-link" href="./students/github-login/drum-kit/">Drum Kit</a>
       <a class="widget-link" href="./students/github-login/js-clock/">JS Clock</a>
     </div>
   </article>
   ```

   Замените `github-login`, названия папок и названия виджетов на свои.

7. Закоммитьте изменения и запушьте свою ветку:

   ```bash
   git add .
   git commit -m "feat: github-login widgets"
   git push origin github-login-widgets
   ```

8. Не стесняйтесь делать пул реквесты для виджетов по отдельности, смотрите чужие пул реквесты, коментируйте код, кидайте апрувы.
Если у вас есть мерж конфликты в ваших пулреквестах - старайтесь их исправить. 

9. В РС апп сабмитим ссылку на ваш README.md файл где вы описали всю проделаную вами работу.
