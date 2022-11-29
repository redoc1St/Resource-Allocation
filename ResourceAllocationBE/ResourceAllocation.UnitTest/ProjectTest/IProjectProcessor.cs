﻿using System;
using ResourceAllocationBE.Model;

namespace ResourceAllocation.UnitTest.ProjectTest
{
    public interface IProjectProcessor
    {
        bool searchProjectByName(Project project);
        bool getDetailProject(Project project);
        bool insertProject(Project project);
        bool updateProject(Project project);

    }
}
