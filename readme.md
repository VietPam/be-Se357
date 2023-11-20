url: https://be-shop-jolv.onrender.com

postman-team: https://se347-api.postman.co/workspace/SE347-API~770693d3-3b9f-4509-8512-d67c75811b9a/overview


relationship:

route n<->1 controller 
controller 1<->n service
service 1<->n DAO

đối với transaction sẽ diễn ra ở service chứ k diễn ra ở DAO, DAO thực hiện CRUD với cơ sở dữ liệu, NHƯNG KHÔNG THỰC HIỆN BUSINESS LOGIC VỚI DỮ LIỆU. Mọi business logic sẽ nằm ở Service  
