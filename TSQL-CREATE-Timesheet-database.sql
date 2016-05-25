USE [Timesheet]
GO

/****** Object:  Table [dbo].[Project]    Script Date: 5/25/2016 12:59:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Project](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Approver] [varchar](255) NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[Timerow]    Script Date: 5/25/2016 12:59:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Timerow](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TimesheetID] [int] NOT NULL,
	[ProjectID] [int] NULL,
	[Code] [varchar](255) NULL,
	[Location] [varchar](255) NULL,
	[Comment] [varchar](2000) NULL,
	[Sat] [decimal](18, 0) NULL,
	[Sun] [decimal](18, 0) NULL,
	[Mon] [decimal](18, 0) NULL,
	[Tue] [decimal](18, 0) NULL,
	[Wed] [decimal](18, 0) NULL,
	[Thu] [decimal](18, 0) NULL,
	[Fri] [decimal](18, 0) NULL,
	[ApproveBy] [varchar](255) NULL,
	[ApproveDate] [date] NULL,
	[ApproveNotes] [varchar](2000) NULL,
 CONSTRAINT [PK_Timerow] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[Timesheet]    Script Date: 5/25/2016 12:59:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Timesheet](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Author] [varchar](255) NULL,
	[WeekEnding] [date] NULL,
	[Comments] [varchar](2000) NULL,
 CONSTRAINT [PK_Timesheet] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Timerow]  WITH CHECK ADD  CONSTRAINT [FK_Timerow_Project] FOREIGN KEY([ProjectID])
REFERENCES [dbo].[Project] ([ID])
GO

ALTER TABLE [dbo].[Timerow] CHECK CONSTRAINT [FK_Timerow_Project]
GO

ALTER TABLE [dbo].[Timerow]  WITH CHECK ADD  CONSTRAINT [FK_Timerow_Timesheet] FOREIGN KEY([TimesheetID])
REFERENCES [dbo].[Timesheet] ([ID])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Timerow] CHECK CONSTRAINT [FK_Timerow_Timesheet]
GO


