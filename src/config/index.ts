
export const createExerciseDefault = {
	runtimeLimit: 2000,
	memoryLimit: 50000,
	scoreWeight: 1,
	manualPercentage: 0,
	judgerId: ''
};

export const contentTypeId = {
	markDown: 0,
	pdf: 1,
	file: 2
};

export const TestResultStatus = {
	Pending: { status: 0, message: 'Pending' },
	Accepted: { status: 1, message: 'Accepted' },
	Wrong: { status: 2, message: 'Wrong' },
	CompilationError: { status: 3, message: 'Compilation Error' },
	RuntimeError: { status: 4, message: 'Runtime Error' },
	MemoryLimitExceeded: { status: 5, message: 'MemoryLimit Exceeded' },
	TimeLimitExceeded: { status: 6, message: 'TimeLimit Exceeded' },
	Others: { status: 7, message: 'Others' }
};
