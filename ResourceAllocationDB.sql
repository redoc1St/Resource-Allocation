use ResourceAllocationDB
--DEPARTMENT
CREATE table Department(
Department_id int primary key identity(1,1),
Department_name nvarchar(50))
insert into Department values('BU1')
insert into Department values('BU2')
insert into Department values('BU3')
insert into Department values('BU4')
insert into Department values('BU5')

--SKILL
create table Skill(
Skill_id int primary key identity(1,1),
SkillName nvarchar(50)
)
insert into Skill values('Java')
insert into Skill values('.NET')
insert into Skill values('BA')
insert into Skill values('PM')
insert into Skill values('Testing')

--LEVEL
create table Levels(
Level_id int primary key identity(1,1),
LevelName nvarchar(50)
)
insert into Levels values('Intern')
insert into Levels values('Fresher')
insert into Levels values('Junior')
insert into Levels values('Middle')
insert into Levels values('Senior')

--ROLE
create table Roles(
Role_id int primary key identity(1,1),
RoleName nvarchar(50)
)
insert into Roles values('PM')
insert into Roles values('PO')
insert into Roles values('BA')
insert into Roles values('DEV')
insert into Roles values('Tester')
insert into Roles values('PQA')

--USER
create table [User] (
[User_id] int primary key identity(1,1),
Username nvarchar(50),
Password nvarchar(50),
Fullname nvarchar(50),
Email nvarchar(50),
Address nvarchar(50),
UserType nvarchar(50),
isActive bit, 
BirthDay date,
Start_Day date,
Department_id int foreign key references Department(Department_id)
)
insert into [User] values('admin2022','123456a','Ad Van Min','admin2022@gmail.com','Ha Noi'
,'admin','1','1985/05/05','2020/01/01',1)
insert into [User] values('quangdd2000','123@123a','Do Duc Quang','quangdd123@gmail.com','Ha Noi'
,'leader','1','2000/12/14','2022/01/01',1)
insert into [User] values('tungct2000','123@123a','Chu Trieu Tung','tungct2022@gmail.com','Ha Noi'
,'employee','1','2000/05/19','2022/01/01',1)
insert into [User] values('sinhtq2000','123@123a','Truong Quocs Sinh','sinhtq2000@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',1)
insert into [User] values('haitl2000','123456a','Tran Long Hai','haitl2022@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',1)
insert into [User] values('ngocdk2000','123456a','Do Kien Ngoc','ngocdk2000@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',1)
--2
insert into [User] values('hieuhm2000','123456a','Hoang Minh Hieu','hieuhm2022@gmail.com','Ha Noi'
,'leader','1','2000/05/05','2022/01/01',2)
insert into [User] values('huongnt2001','123456a','Nguyen Thu Huong','huongnt2022@gmail.com','Ha Noi'
,'employee','1','2001/05/05','2022/01/01',2)
insert into [User] values('longnt1999','123456a','Nguyen Thanh Long','longnt2022@gmail.com','Ha Noi'
,'employee','1','1999/05/05','2022/01/01',2)
insert into [User] values('khanhnd1998','123456a','Nguyen Duc Khanh','khanhnd2022@gmail.com','Ha Noi'
,'employee','0','1998/05/05','2022/01/01',2)
insert into [User] values('phatnt2000','123456a','Nguyen Thanh Phat','phatnt2022@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',2)
insert into [User] values('tuannt2000','123456a','Nguyen Thanh Tuan','tuannt2022@gmail.com','Ha Noi'
,'employee','0','2000/05/05','2022/01/01',2)
--3
insert into [User] values('anhdt1998','123456a','Dang Trong Anh','anhdt1998@gmail.com','Ha Noi'
,'leader','1','1998/05/05','2022/01/01',3)
insert into [User] values('hangnt2001','123456a','Nguyen Thu Hang','hangnt2001@gmail.com','Ha Noi'
,'employee','1','2001/05/05','2022/01/01',3)
insert into [User] values('longnv1999','123456a','Nguyen Van Long','longnv2022@gmail.com','Ha Noi'
,'employee','1','1999/05/05','2022/01/01',3)
insert into [User] values('khanhdd1998','123456a','Dao Duc Khanh','khanhdd2022@gmail.com','Ha Noi'
,'employee','1','1998/05/05','2022/01/01',3)
insert into [User] values('phatnh2002','123456a','Nguyen Huu Phat','phatnh2022@gmail.com','Ha Noi'
,'employee','1','2002/05/05','2022/01/01',3)
insert into [User] values('tuanct2003','123456a','Chu Thanh Tuan','tuanct2022@gmail.com','Ha Noi'
,'employee','0','2003/05/05','2022/01/01',3)
--4
insert into [User] values('namvn1998','123456a','Vu Nhat Nam','namvn1998@gmail.com','Ha Noi'
,'leader','1','1998/05/05','2022/01/01',4)
insert into [User] values('haidd2001','123456a','Dam Duc Hai','haidd2001@gmail.com','Ha Noi'
,'employee','1','2001/05/05','2022/01/01',4)
insert into [User] values('hoangnh1999','123456a','Nguyen Huy Hoang','hoangnh1999@gmail.com','Ha Noi'
,'employee','1','1999/05/05','2022/01/01',4)
insert into [User] values('thuyct1998','123456a','Chu Thi Thuy','thuyct1998@gmail.com','Ha Noi'
,'employee','1','1998/05/05','2022/01/01',4)
insert into [User] values('duongnh2002','123456a','Nguyen Huu Duong','duongnh2002@gmail.com','Ha Noi'
,'employee','1','2002/05/05','2022/01/01',4)
insert into [User] values('huyenht2003','123456a','Hoang Thu Huyen','huyenht2003@gmail.com','Ha Noi'
,'employee','1','2003/05/05','2022/01/01',4)
--5
insert into [User] values('minhdt1995','123456a','Dinh Tuan Minh','minhdt1995@gmail.com','Ha Noi'
,'employee','1','1995/05/05','2020/01/01',5)
insert into [User] values('huannn1999','123@123a','Nguyen Nhu Huan','huannn1999@gmail.com','Ha Noi'
,'leader','1','1999/12/14','2022/01/01',5)
insert into [User] values('vietnh1998','123@123a','Nguyen Hoang Viet','vietnh1998@gmail.com','Ha Noi'
,'employee','1','1998/05/19','2022/01/01',5)
insert into [User] values('ducnh2000','123@123a','Nguyen Huy Duc','ducnh2000@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',5)
insert into [User] values('anhnt2000','123456a','Nguyen The Anh','anhnt2000@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',5)

---PROJECT
create table Project(
Project_id int primary key identity(1,1),
Code nvarchar(50),
ProjectName nvarchar(50),
Depeartment_id int foreign key references Department(Department_id),
Effort_planned int,
Effort_actual int,
Effort_billable int,
Quantity_plan int, 
Quantity_actual int,
Start_plan date,
Start_actual date,
End_plan date,
End_actual date,
note nvarchar(200)
)
insert into Project values('HM_01','Hotel Management',1,5,3,3,2,2,
'2022/10/01','2022/10/01','2023/02/10','2023/02/10',''
)
insert into Project values('OLS_02','Online Learning System',2,4,2,3,3,3,
'2022/09/01','2022/09/01','2023/02/10','2023/02/10',''
)
insert into Project values('PHL_03','Pet Hola Kingdom',3,3,1,2,2,2,
'2022/09/01','2022/09/01','2023/02/10','2023/02/10',''
)
insert into Project values('VPE_04','Vietnam Products Exchange',4,3,2,2,3,3,
'2022/11/01','2022/11/01','2023/02/10','2023/02/10',''
)
insert into Project values('ECM_05','English Center Management',5,3,3,2,2,2,
'2022/11/01','2022/11/01','2023/02/10','2023/02/10',''
)
insert into Project values('SSPS_06','Spa service providing system',1,2,2,1,2,2,
'2022/10/01','2022/10/01','2023/02/10','2023/02/10',''
)
insert into Project values('RRS_07','Room rental system ',2,4,1,3,2,2,
'2022/10/01','2022/10/01','2023/02/10','2023/02/10',''
)
insert into Project values('FBM_08','Furniture Business Management',3,3,1,3,2,2,
'2022/10/01','2022/10/01','2023/02/10','2023/02/10',''
)
insert into Project values('FFS_09','Freelance Finding System',4,4,1,3,2,2,
'2022/10/01','2022/10/01','2023/02/10','2023/02/10',''
)
insert into Project values('TPS_10','Trip Planner System',5,3,3,2,2,2,
'2022/10/01','2022/10/01','2023/02/10','2023/02/10',''
)




--ResourcePlanning_Role
create table ResourcePlanning_Role(
id int primary key identity(1,1),
Project_id int foreign key references Project(Project_id),
Role_id int foreign key references Roles(Role_id) ,
Quantity int,
Date_start date,
Date_end date,
Effort_planned int,
Effort_actual int,
Bill_rate int,
Level_id int foreign key references Levels(Level_id),
Skill_id int foreign key references Skill(Skill_id),
[Status] nvarchar(50)
)

insert into ResourcePlanning_Role (
Project_id,
Role_id,
Quantity,
Date_start ,
Date_end ,
Effort_planned ,
Effort_actual ,
Bill_rate ,
Level_id,
Skill_id ,
[Status]) values(1,3,2,'2022/11/01', '2023/01/10'
,100,100,100,2,1,'Waiting')

insert into ResourcePlanning_Role values(1,4,1,'2022/10/01', '2023/01/10'
,100,100,100,5,3,'Waiting')
insert into ResourcePlanning_Role values(1,5,1,'2022/10/01', '2023/01/10'
,100,100,100,4,5,'Waiting')
insert into ResourcePlanning_Role values(1,6,1,'2022/11/01', '2023/01/10'
,100,100,100,4,3,'Waiting')

insert into ResourcePlanning_Role values(2,3,1,'2022/11/01', '2023/01/10'
,100,100,100,5,4,'Waiting')
insert into ResourcePlanning_Role values(2,4,1,'2022/11/01', '2023/01/10'
,100,100,100,3,1,'Waiting')
insert into ResourcePlanning_Role values(2,5,1,'2022/11/01', '2023/01/10'
,100,100,100,5,4,'Waiting')
insert into ResourcePlanning_Role values(2,6,1,'2022/12/01', '2023/01/10'
,100,100,100,5,5,'Waiting')
insert into ResourcePlanning_Role values(1,3,1,'2022/12/01', '2023/01/10'
,100,100,100,3,3,'Waiting')
insert into ResourcePlanning_Role values(3,4,2,'2022/12/01', '2023/01/10',100,100,100,3,1,'Waiting')					
insert into ResourcePlanning_Role values(3,3,2,'2022/12/01', '2023/01/10',100,100,100,2,1,'Waiting')					
insert into ResourcePlanning_Role values(4,6,2,'2022/12/01', '2023/01/10',100,100,100,4,3,'Waiting')					
insert into ResourcePlanning_Role values(4,2,2,'2022/12/01', '2023/01/10',100,100,100,4,5,'Waiting')					
insert into ResourcePlanning_Role values(5,6,1,'2022/12/01', '2023/01/10',100,100,100,2,1,'Waiting')					
insert into ResourcePlanning_Role values(5,3,1,'2022/12/01', '2023/01/10',100,100,100,3,3,'Waiting')					
insert into ResourcePlanning_Role values(3,4,2,'2022/12/01', '2023/01/10',100,100,100,2,1,'Waiting')					
insert into ResourcePlanning_Role values(4,4,2,'2022/12/01', '2023/01/10',100,100,100,3,2,'Waiting')					
insert into ResourcePlanning_Role values(3,3,2,'2022/12/01', '2023/01/10',100,100,100,3,3,'Waiting')
insert into ResourcePlanning_Role values(6,6,2,'2022/11/29', '2023/01/03',88,0,88,2,3,'Waiting')
insert into ResourcePlanning_Role values(10,4,2,'2022-11-10', '2023-01-13',80,0,80,1,2,'Waiting')
insert into ResourcePlanning_Role values(9,4,2,'2022-10-21', '2023-02-01',80,0,80,1,1,'Waiting')
insert into ResourcePlanning_Role values(10,3,2,'2022-11-14', '2023-01-18',80,0,80,2,3,'Waiting')
insert into ResourcePlanning_Role values(9,5,2,'2022-11-18', '2023-01-06',80,0,80,2,5,'Waiting')
insert into ResourcePlanning_Role values(8,6,2,'2022-11-23', '2023-01-21',80,0,80,2,3,'Waiting')
insert into ResourcePlanning_Role values(10,6,2,'2022-11-27', '2023-01-14',80,0,80,3,3,'Waiting')
insert into ResourcePlanning_Role values(8,4,2,'2022-11-23', '2023-01-07',80,0,80,3,2,'Waiting')
--ResourcePlanning_Employee
create table ResourcePlanning_Employee(
id int primary key identity(1,1),
Employee_id int foreign key references [User]([User_id]),
Role_id int foreign key references Roles(Role_id),
Level_id int foreign key references Levels(Level_id),
Skill_id int foreign key references Skill(Skill_id)
)
--1
insert into ResourcePlanning_Employee values(3,3,2,1)
insert into ResourcePlanning_Employee values(3,4,1,2)
insert into ResourcePlanning_Employee values(4,3,3,3)
insert into ResourcePlanning_Employee values(4,4,4,4)
insert into ResourcePlanning_Employee values(5,5,4,5)
insert into ResourcePlanning_Employee values(5,1,4,4)
insert into ResourcePlanning_Employee values(6,6,3,3)
--2
insert into ResourcePlanning_Employee values(8,4,5,3)
insert into ResourcePlanning_Employee values(8,5,4,3)
insert into ResourcePlanning_Employee values(9,6,4,4)
insert into ResourcePlanning_Employee values(10,4,3,2)
insert into ResourcePlanning_Employee values(11,5,5,4)
insert into ResourcePlanning_Employee values(11,6,5,3)
--3
insert into ResourcePlanning_Employee values(14,5,3,5)					
insert into ResourcePlanning_Employee values(14,3,2,2)					
insert into ResourcePlanning_Employee values(15,2,4,4)					
insert into ResourcePlanning_Employee values(15,1,4,2)					
insert into ResourcePlanning_Employee values(16,4,2,1)					
insert into ResourcePlanning_Employee values(16,5,1,5)					
insert into ResourcePlanning_Employee values(17,4,1,2)					
insert into ResourcePlanning_Employee values(17,6,4,3)					
--4
insert into ResourcePlanning_Employee values(20,5,3,5)					
insert into ResourcePlanning_Employee values(20,4,3,1)					
insert into ResourcePlanning_Employee values(21,1,4,4)					
insert into ResourcePlanning_Employee values(21,3,3,3)					
insert into ResourcePlanning_Employee values(22,3,2,1)					
insert into ResourcePlanning_Employee values(22,5,2,5)					
insert into ResourcePlanning_Employee values(23,4,3,2)					
insert into ResourcePlanning_Employee values(23,6,4,3)					
insert into ResourcePlanning_Employee values(24,2,4,5)		
--5
insert into ResourcePlanning_Employee values(25,3,1,2)					
insert into ResourcePlanning_Employee values(25,4,3,1)					
insert into ResourcePlanning_Employee values(27,5,4,5)					
insert into ResourcePlanning_Employee values(27,3,3,3)					
insert into ResourcePlanning_Employee values(28,4,3,3)					
insert into ResourcePlanning_Employee values(28,4,2,1)					
insert into ResourcePlanning_Employee values(29,3,3,3)					
insert into ResourcePlanning_Employee values(29,6,5,5)					




-- mix EMP_PLANNING_ROLE
create table Emp_RolePlanning(
id int primary key identity(1,1),
ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id),
Employee_id int foreign key references ResourcePlanning_Employee(id),
Date_start date,
Date_end date,
Effort int, 
Bill_rate int
)
insert into Emp_RolePlanning values(1,1,'12-05-2022','12-21-2022',20,20)
insert into Emp_RolePlanning values(19,7,'2022-12-12','2023-01-02',20,20)
insert into Emp_RolePlanning values(5,5,'2022-11-28','2023-01-04',20,20)
insert into Emp_RolePlanning values(18,3,'2022-12-18','2023-01-07',25,25)
insert into Emp_RolePlanning values(7,12,'2022-12-19','2023-01-09',30,30)
insert into Emp_RolePlanning values(12,13,'2022-12-01','2023-01-06',30,30)
insert into Emp_RolePlanning values(16,18,'2022-12-03','2023-01-04',30,30)
insert into Emp_RolePlanning values(2,8,'2022-11-24','2022-12-31',15,15)
insert into Emp_RolePlanning values(11,26,'2022-12-06','2023-01-06',15,15)
--ResourceRequestRole
create table ResourceRequestRole(
id int primary key identity(1,1),
ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id),
Requested_to int foreign key references [User]([User_id]),
Approved_by nvarchar(50),
lastestTime datetime
)
insert into ResourceRequestRole values(1,2,'',GETDATE())
insert into ResourceRequestRole values(2,2,'',GETDATE())
insert into ResourceRequestRole values(3,2,'',GETDATE())
insert into ResourceRequestRole values(4,2,'',GETDATE())
insert into ResourceRequestRole values(5,7,'',GETDATE())
insert into ResourceRequestRole values(6,7,'',GETDATE())
insert into ResourceRequestRole values(7,7,'',GETDATE())
insert into ResourceRequestRole values(8,7,'',GETDATE())
insert into ResourceRequestRole values(9,2,'',GETDATE())
insert into ResourceRequestRole values(10,13,'',GETDATE())
insert into ResourceRequestRole values(11,13,'',GETDATE())
insert into ResourceRequestRole values(12,19,'',GETDATE())
insert into ResourceRequestRole values(13,19,'',GETDATE())
insert into ResourceRequestRole values(14,26,'',GETDATE())
insert into ResourceRequestRole values(15,26,'',GETDATE())
insert into ResourceRequestRole values(16,13,'',GETDATE())
insert into ResourceRequestRole values(17,19,'',GETDATE())
insert into ResourceRequestRole values(18,13,'',GETDATE())
--new
insert into ResourceRequestRole values(19,19,2,GETDATE())
update ResourcePlanning_Role set [status] = 'Approved' where id between 1 and 19

--ResourceRequestEmployee
create table ResourceRequestEmployee(
id int primary key identity(1,1),
ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id),
Employee_id int foreign key references ResourcePlanning_Employee(id),
Requested_to int foreign key references [User]([User_id]),
Approved_by nvarchar(50),
[status] nvarchar(50),
lastestTime datetime,
request_start date,
request_end date,
request_effort int, 
request_bill int
)
insert into ResourceRequestEmployee values(19,21,2,13,'Approved',GETDATE(),'2022-12-05','2022-12-28',25,25)
insert into ResourceRequestEmployee values(18,3,2,2,'Approved',GETDATE(),'2022-12-18','2023-01-07',25,25)
insert into ResourceRequestEmployee values(12,13,2,7,'Approved',GETDATE(),'2022-12-01','2023-01-06',30,30)


create table Notifications (
id int primary key identity(1,1),
user_id int foreign key references [User]([User_id]),
content nvarchar(200),
noti_time datetime
)



go



-- CHECK DATE TIME 
-- project and role

begin 
declare @start_date_role date
declare	@end_date_role date
declare @start_date_pro date
declare	@end_date_pro date
select @start_date_pro = Project.Start_actual, @end_date_pro = Project.End_actual
from Project where Code='AIS_0001'

select @start_date_role = Date_start, @end_date_role = Date_end
from Project
join ResourcePlanning_Role on ResourcePlanning_Role.Project_id = Project.Project_id
where Project.Code='AIS_0001' and Role_id=3 and Level_id=2 and Skill_id=1

if(@start_date_role>@start_date_pro or @end_date_role>@end_date_pro)
begin 
select * from project
end
else select * from [user]
end