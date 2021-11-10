Setup Backend  
=============

- Install requirements exists in requirements.txt file `pip install -r requirements.txt`
- Migrate existing migrations `python manage.py migrate`
- Run project using `python manage.py runserver`
- Run tests for available APIs `python manage.py test`
- Checkout below APIs to manage Jobs


Job App API Endpoints
----------------------

- Create Job `jobs/create`
- List Jobs `jobs/get_jobs_list`
- Get Job Detail by job_id `jobs/get_job_details/<job_id>`
- Get Skills list with most used number `jobs/get_skills_list`

> API Documentation url: https://docs.google.com/document/d/11yT3UlHNCZyN7BNy5R6175I5tHtFrMWzK8ahMlI7s5E/edit?usp=sharing

<br>

Setup Frontend  
===============

- Setup latest version of nvm and node
- Change directory to frontend and Install node modules `npm install`
- Now run server `npm start` 

> Above process will open landing page on `http://localhost:3000`. 