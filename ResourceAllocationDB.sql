create database ResourceAllocationDB
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
if not exists ( select * from Project where Code = 'AIS_0001')
insert into Project values('AIS_0001','ProjectName1',1,2,5,1,2,2,
'2022/06/01','2022/06/01','2022/12/10','2022/12/10',''
)
if not exists ( select * from Project where Code = 'AIS_0002')
insert into Project values('AIS_0002','ProjectName2',2,5,4,3,3,3,
'2022/05/01','2022/05/01','2022/10/10','2022/12/10',''
)
insert into Project values('AIS_0003','ProjectName3',3,2,1,0,2,2,
'2022/06/01','2022/06/01','2022/12/10','2022/12/10',''
)
insert into Project values('AIS_0004','ProjectName4',4,4,3,3,3,3,
'2022/06/01','2022/06/01','2022/12/10','2022/12/10',''
)
insert into Project values('AIS_0005','ProjectName5',5,2,5,1,2,2,
'2022/07/01','2022/07/01','2022/12/10','2022/12/10',''
)
insert into Project values('AIS_0006','ProjectName6',1,2,5,1,2,2,
'2022/07/01','2022/07/01','2022/12/10','2022/12/10',''
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

insert into ResourcePlanning_Role (Project_id,
Role_id,Quantity,
Date_start ,
Date_end ,
Effort_planned ,
Effort_actual ,
Bill_rate ,
Level_id,
Skill_id ,
[Status]) values(1,3,2,'2022/06/01', '2022/06/10'
,100,'',100,5,2,'Waiting')

insert into ResourcePlanning_Role values(1,4,1,'2022/06/01', '2022/06/10'
,100,'',100,5,3,'Approved')
insert into ResourcePlanning_Role values(1,5,1,'2022/06/01', '2022/06/10'
,100,'',100,5,2,'Approved')
insert into ResourcePlanning_Role values(1,6,1,'2022/06/01', '2022/06/10'
,100,'',100,5,1,'Approved')

insert into ResourcePlanning_Role values(2,3,1,'2022/06/01', '2022/06/10'
,100,'',100,5,4,'Approved')
insert into ResourcePlanning_Role values(2,4,1,'2022/06/01', '2022/06/10'
,100,'',100,5,5,'Approved')
insert into ResourcePlanning_Role values(2,5,1,'2022/06/01', '2022/06/10'
,100,'',100,5,4,'Approved')
insert into ResourcePlanning_Role values(2,6,1,'2022/06/01', '2022/06/10'
,100,'',100,5,3,'Approved')
insert into ResourcePlanning_Role values(1,3,1,GETDATE(), GETDATE()
,100,'',100,5,3,'Approved')


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
--insert into Emp_RolePlanning values(1,1,'2022/06/01','2022/06/11',50,50)
--insert into Emp_RolePlanning values(2,1,'2022/06/03','2022/06/12',30,30)
--insert into Emp_RolePlanning values(1,2,'2022/06/04','2022/06/13',20,40)
--insert into Emp_RolePlanning values(5,2,'2022/06/05','2022/06/14',20,50)
--insert into Emp_RolePlanning values(2,2,'2022/06/06','2022/06/15',10,30)
--insert into Emp_RolePlanning values(3,1,'2022/06/07','2022/06/16',20,10)
--insert into Emp_RolePlanning values(4,1,'2022/06/08','2022/06/17',30,20)

--ResourceRequestRole
create table ResourceRequestRole(
id int primary key identity(1,1),
ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id),
Requested_to int foreign key references [User]([User_id]),
Approved_by nvarchar(50),
lastestTime datetime
)


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


create table Notifications (
id int primary key identity(1,1),
user_id int foreign key references [User]([User_id]),
content nvarchar(200),
noti_time datetime
)







go
 select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, Emp_RolePlanning.Date_start, [user].Username,
                    Emp_RolePlanning.Date_end, Effort,Emp_RolePlanning.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id,emp_RolePlanning.ResourcePlannig_RoleId
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
left join Project on Project.Project_id = ResourcePlanning_Role.project_id