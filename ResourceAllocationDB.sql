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
,'admin','1','1985/05/05','2020/01/01','')
insert into [User] values('quangdd2000','123@123a','Do Duc Quang','quangdd123@gmail.com','Ha Noi'
,'leader','1','2000/12/14','2022/01/01',1)
insert into [User] values('tungct2000','123@123a','Chu Trieu Tung','tungct2022@gmail.com','Ha Noi'
,'employee','1','2000/05/19','2022/01/01',1)
insert into [User] values('sinhtq2000','123@123a','Truong Quocs Sinh','2022@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',1)
insert into [User] values('haitl2000','123456a','Tran Long Hai','haitl2022@gmail.com','Ha Noi'
,'employee','1','2000/05/05','2022/01/01',1)
insert into [User] values('hieuhm2000','123456a','Hoang Minh Hieu','hieuhm2022@gmail.com','Ha Noi'
,'leader','1','2000/05/05','2022/01/01',2)
insert into [User] values('huongnt2001','123456a','Nguyen Thu Huong','huongnt2022@gmail.com','Ha Noi'
,'employee','1','2001/05/05','2022/01/01',2)
insert into [User] values('longnt1999','123456a','Nguyen Thanh Long','longnt2022@gmail.com','Ha Noi'
,'employee','1','1999/05/05','2022/01/01',2)
insert into [User] values('khanhnd1998','123456a','Nguyen Duc Khanh','khanhnd2022@gmail.com','Ha Noi'
,'employee','0','1998/05/05','2022/01/01',2)
insert into [User] values('phatnt2000','123456a','Nguyen Thanh Phat','phatnt2022@gmail.com','Ha Noi'
,'employee','0','2000/05/05','2022/01/01',2)
insert into [User] values('tuannt2000','123456a','Nguyen Thanh Tuan','tuannt2022@gmail.com','Ha Noi'
,'employee','0','2000/05/05','2022/01/01',2)
--USER ROLE
create table User_Role(
Role_id int foreign key references Roles(Role_id),
[User_id] int foreign key references [User]([User_id])
)
insert into User_Role values(3,3)
insert into User_Role values(4,3)
insert into User_Role values(3,4)
insert into User_Role values(4,4)
insert into User_Role values(5,5)
insert into User_Role values(1,6)
insert into User_Role values(3,7)
insert into User_Role values(4,8)
insert into User_Role values(5,8)
insert into User_Role values(6,9)
insert into User_Role values(4,10)
insert into User_Role values(5,11)
insert into User_Role values(6,11)



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
End_actual date
)
insert into Project values('AIS_0001','ProjectName1',1,2,5,1,2,2,
'2022/06/01','2022/06/01','2022/06/10','2022/06/10'
)
insert into Project values('AIS_0002','ProjectName2',2,5,4,3,3,3,
'2022/05/01','2022/05/01','2022/06/10','2022/06/10'
)
insert into Project values('AIS_0003','ProjectName3',3,2,1,0,2,2,
'2022/06/01','2022/06/01','2022/06/10','2022/06/10'
)
insert into Project values('AIS_0004','ProjectName4',4,4,3,3,3,3,
'2022/06/01','2022/06/01','2022/06/10','2022/06/10'
)
insert into Project values('AIS_0005','ProjectName5',5,2,5,1,2,2,
'2022/07/01','2022/07/01','2022/07/10','2022/07/10'
)


--ResourcePlanning_Role
create table ResourcePlanning_Role(
id int primary key identity(1,1),
Project_id int foreign key references Project(Project_id),
Role_id int foreign key references Roles(Role_id) ,
Employee_id int foreign key references [User]([User_id]),
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

insert into ResourcePlanning_Role (Project_id,Role_id,Quantity,Date_start ,
Date_end ,
Effort_planned ,
Effort_actual ,
Bill_rate ,
Level_id,
Skill_id ,
[Status]) values(1,3,1,'2022/06/01', '2022/06/10'
,100,'',100,5,2,1)
insert into ResourcePlanning_Role values(1,4,5,1,'2022/06/01', '2022/06/10'
,100,'',100,5,3,1)
insert into ResourcePlanning_Role values(1,5,6,1,'2022/06/01', '2022/06/10'
,100,'',100,5,2,1)
insert into ResourcePlanning_Role values(1,6,3,1,'2022/06/01', '2022/06/10'
,100,'',100,5,1,1)

insert into ResourcePlanning_Role values(2,3,8,1,'2022/06/01', '2022/06/10'
,100,'',100,5,4,1)
insert into ResourcePlanning_Role values(2,4,9,1,'2022/06/01', '2022/06/10'
,100,'',100,5,5,1)
insert into ResourcePlanning_Role values(2,5,10,1,'2022/06/01', '2022/06/10'
,100,'',100,5,4,1)
insert into ResourcePlanning_Role values(2,6,11,1,'2022/06/01', '2022/06/10'
,100,'',100,5,3,1)


--ResourcePlanning_Employee
create table ResourcePlanning_Employee(
id int primary key identity(1,1),
ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id) null,
Employee_id int foreign key references [User]([User_id]),
Role_id int foreign key references Roles(Role_id),
Date_start date,
Date_end date,
Effort int, 
Bill_rate int,
Level_id int foreign key references Levels(Level_id),
Skill_id int foreign key references Skill(Skill_id)
)
insert into ResourcePlanning_Employee values(
1,3,3,'2022/06/01','2022/06/10','','',2,1
)
insert into ResourcePlanning_Employee values(
2,3,4,'2022/06/01','2022/06/10','','',1,2
)
insert into ResourcePlanning_Employee values(
3,4,3,'2022/06/01','2022/06/10','','',3,3
)
insert into ResourcePlanning_Employee values(
4,4,4,'2022/06/01','2022/06/10','','',4,4
)
insert into ResourcePlanning_Employee values(
1,5,5,'2022/06/01','2022/06/10','','',5,5
)
insert into ResourcePlanning_Employee values(
2,6,1,'2022/06/01','2022/06/10','','',3,3
)
insert into ResourcePlanning_Employee values(
5,7,3,'2022/06/01','2022/06/10','','',4,2
)
insert into ResourcePlanning_Employee values(
6,8,4,'2022/06/01','2022/06/10','','',5,3
)
insert into ResourcePlanning_Employee values(
7,8,5,'2022/06/01','2022/06/10','','',4,3
)
insert into ResourcePlanning_Employee values(
8,9,6,'2022/06/01','2022/06/10','','',4,4
)
insert into ResourcePlanning_Employee values(
5,10,4,'2022/06/01','2022/06/10','','',3,2
)
insert into ResourcePlanning_Employee values(
6,11,5,'2022/06/01','2022/06/10','','',5,4
)
insert into ResourcePlanning_Employee values(
7,11,6,'2022/06/01','2022/06/10','','',5,3
)

--ResourceRequest
create table ResourceRequest(
ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id),
[Type] int,
Requested_at nvarchar(50),
Requested_by nvarchar(50),
Approved_at nvarchar(50),
Approved_by nvarchar(50)
)
insert into ResourceRequest values(
1,2,'admin','admin','admin','admin')

---- Mix_Skill
--create table Employee_Skill(
--Skill_id int foreign key references Skill(Skill_id),
--Employee_id int foreign key references ResourcePlanning_Employee(id)
--)
--insert into Employee_Skill values(1,1)
--insert into Employee_Skill values(2,2)
--insert into Employee_Skill values(2,3)
--insert into Employee_Skill values(2,4)
--insert into Employee_Skill values(3,5)
--insert into Employee_Skill values(4,6)
--insert into Employee_Skill values(3,7)
--insert into Employee_Skill values(4,8)
--insert into Employee_Skill values(3,9)
--insert into Employee_Skill values(4,10)
--insert into Employee_Skill values(3,11)
--insert into Employee_Skill values(4,12)
--insert into Employee_Skill values(4,13)

--create table Role_Skill(
--Skill_id int foreign key references Skill(Skill_id),
--ResourcePlannig_RoleId int foreign key references ResourcePlanning_Role(id),
--)

--insert into Role_Skill values(1,1)
--insert into Role_Skill values(2,2)
--insert into Role_Skill values(2,3)
--insert into Role_Skill values(2,4)
--insert into Role_Skill values(3,5)
--insert into Role_Skill values(4,6)
--insert into Role_Skill values(3,7)
--insert into Role_Skill values(4,8)

-- SELECT RESOURCE PLANNING

select id,Roles.RoleName, ProjectName, [User].Fullname,
Quantity, Date_start, Date_end, ResourcePlanning_Role.Effort_planned,
ResourcePlanning_Role.Effort_actual, Bill_rate, [Status], 
LevelName, SkillName
from ResourcePlanning_Role, Roles,Project, [user], Levels,Skill
where ResourcePlanning_Role.Project_id = Project.Project_id and
Roles.Role_id = ResourcePlanning_Role.Role_id and
ResourcePlanning_Role.Employee_id = [User].[User_id] 
and ResourcePlanning_Role.Level_id = Levels.Level_id and
ResourcePlanning_Role.Skill_id =  Skill.Skill_id
and Project.code = 'ais_0001'


--select RESOURCEPOOL
select id, RoleName, ProjectName
from ResourcePlanning_Role, roles,Project, [user]
where ResourcePlanning_Role.Role_id = roles.Role_id and
ResourcePlanning_Role.Project_id = Project.Project_id
and Project.Code = 'ais_0001'



--select RESOURCEPOOL by ROLE
select ResourcePlanning_Employee.id, [User].Fullname, Roles.RoleName, Levels.LevelName, Skill.SkillName,
Project.ProjectName, ResourcePlanning_Employee.Date_start, 
ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
from ResourcePlanning_Employee, [User], Roles, User_Role, Levels, Skill, 
Project, ResourcePlanning_Role, Department
where ResourcePlanning_Employee.Employee_id = [User].[User_id] and

[User].[User_id] = User_Role.[User_id] and
User_Role.Role_id = Roles.Role_id and
[User].Department_id = Department.Department_id and

ResourcePlanning_Employee.Level_id = Levels.Level_id AND

Skill.Skill_id = ResourcePlanning_Employee.Skill_id and

Project.Project_id = ResourcePlanning_Role.Project_id and
ResourcePlanning_Role.Employee_id =ResourcePlanning_Employee.Employee_id
and RoleName = 'ba' and Project.Code = 'ais_0001'



select ResourcePlanning_Employee.id, [User].Fullname, Roles.RoleName, Levels.LevelName, Skill.SkillName,
Project.ProjectName, ResourcePlanning_Employee.Date_start, 
ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
from ResourcePlanning_Employee, [User], Roles, User_Role, Levels,  Skill, 
Project, ResourcePlanning_Role, Department
where ResourcePlanning_Employee.Employee_id = [User].[User_id] and

[User].[User_id] = User_Role.[User_id] and
User_Role.Role_id = Roles.Role_id and
[User].Department_id = Department.Department_id and

ResourcePlanning_Employee.Level_id = Levels.Level_id AND
Skill.Skill_id = ResourcePlanning_Employee.Skill_id and

Project.Project_id = ResourcePlanning_Role.Project_id and
ResourcePlanning_Role.Employee_id =ResourcePlanning_Employee.Employee_id
and [User].Fullname like '%tung%'



  if not exists ( select * from ResourcePlanning_Role where Role_id = 4 and Level_id =2 and Skill_id =2 and Project_id=5)
  insert into ResourcePlanning_Role(Role_id,Level_id,Skill_id) values(4,2,2)

    if not exists ( select * from Project where Code = 'AIS_0001')
	insert into Project values('AIS_0001','ProjectName1',1,2,5,1,2,2,'2022/06/01','2022/06/01','2022/06/10','2022/06/10')

  select * from Project