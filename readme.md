

relationship:

route n<->1
controller 1<->n
service 1<->n DAO

đối với transaction sẽ diễn ra ở service chứ k diễn ra ở DAO, DAO thực hiện CRUD với cơ sở dữ liệu, NHƯNG KHÔNG THỰC HIỆN BUSINESS LOGIC VỚI DỮ LIỆU. Mọi business logic sẽ nằm ở Service  
